import React, { useState } from "react";
import studentHat from "../assets/images/studenthat.jpg";
import Alert from "./Alert";

export default function RegisterStudent() {
  const [formData, setFormData] = useState({
    name: "",
    links: [""],
    profileImage: studentHat,
  });

  const [imagePreview, setImagePreview] = useState(studentHat);
  const [alert, setAlert] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleLinkChange(index, value) {
    setFormData((currentData) => {
      const updatedLinks = [...currentData.links];
      updatedLinks[index] = value;

      return {
        ...currentData,
        links: updatedLinks,
      };
    });
  }

  function addLinkField() {
    setFormData((currentData) => ({
      ...currentData,
      links: [...currentData.links, ""],
    }));
  }

  function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result;
        setImagePreview(imageData);
        setFormData((currentData) => ({
          ...currentData,
          profileImage: imageData,
        }));
      };
      reader.readAsDataURL(file);
    }
  }

  function removeImage() {
    setImagePreview(studentHat);
    setFormData((currentData) => ({
      ...currentData,
      profileImage: studentHat,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const cleanedLinks = formData.links
      .map((link) => link.trim())
      .filter(Boolean);

    try {
      const payload = {
        ...formData,
        links: cleanedLinks,
      };

      const res = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let errorMessage = "Det gick inte att spara registreringen";

        try {
          const errorData = await res.json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          if (res.status === 502) {
            errorMessage =
              "Backend svarar inte. Kontrollera att servern körs och att DB_URI i .env är korrekt.";
          }
        }

        throw new Error(errorMessage);
      }

      const responseData = await res.json();
      console.log("Svar från servern:", responseData);

      setFormData({
        name: "",
        links: [""],
        profileImage: studentHat,
      });
      setImagePreview(studentHat);
      setAlert("Registreringen lyckades!");

      setTimeout(() => {
        setAlert("");
      }, 3000);
    } catch (error) {
      console.error("Något gick fel:", error);
      setAlert(error.message);

      setTimeout(() => {
        setAlert("");
      }, 3000);
    }
  }

  return (
    <>
      {alert && <Alert alert={alert} />}
      <form className="registerStudentForm" onSubmit={handleSubmit}>
        <div className="profileImageField">
          <div className="profileImagePreviewWrapper">
            <img
              className="profileImagePreview"
              src={imagePreview || studentHat}
              alt="Profilbild preview"
            />
          </div>
          <input
            className="hiddenFileInput"
            id="profileImage"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <div className="profileImageActions">
            <label className="imageActionButton" htmlFor="profileImage">
              Välj bild
            </label>
            {imagePreview !== studentHat && (
              <button
                className="imageActionButton"
                type="button"
                onClick={removeImage}
              >
                Ta bort bild
              </button>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="name">Kandidat</label>
          <input
            className="formInput"
            id="name"
            type="text"
            name="name"
            placeholder="Ex: Emma Stone"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="link-0">Link</label>
          {formData.links.map((link, index) => (
            <input
              className="formInput linkInput"
              key={index}
              id={`link-${index}`}
              type="text"
              inputMode="url"
              autoCapitalize="none"
              autoCorrect="off"
              value={link}
              onChange={(event) => handleLinkChange(index, event.target.value)}
              placeholder="Ex: portfolio, linkedIn"
            />
          ))}
          <button
            className="addLinkButton"
            type="button"
            onClick={addLinkField}
            aria-label="Lägg till länk"
          >
            +
          </button>
        </div>

        <button type="submit">Registrera</button>
      </form>
    </>
  );
}
