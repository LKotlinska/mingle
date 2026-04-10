import React, { useState } from "react";
import studentHat from "../assets/images/studenthat.jpg";
import studentPictureIcon from "../assets/images/student-picture.png";
import Alert from "./Alert";

const DEFAULT_STUDENT_IMAGE_KEY = "studenthat.jpg";

export default function RegisterStudent() {
  const [formData, setFormData] = useState({
    name: "",
    education: "",
    links: [""],
    profileImage: studentHat,
  });

  const [imagePreview, setImagePreview] = useState(studentHat);
  const [alert, setAlert] = useState("");

  function normalizeLink(rawLink) {
    const trimmed = rawLink.trim();
    if (!trimmed) return "";

    return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  }

  function isValidHttpUrl(link) {
    try {
      const url = new URL(link);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  }

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

  function closeImageMenu(event) {
    const details = event.currentTarget.closest("details");
    if (details) {
      details.removeAttribute("open");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const cleanedLinks = formData.links
      .map((link) => normalizeLink(link))
      .filter(Boolean);

    const invalidLink = cleanedLinks.find((link) => !isValidHttpUrl(link));
    if (invalidLink) {
      setAlert("Ogiltig länk. Ange t.ex. https://min-sida.se");
      setTimeout(() => {
        setAlert("");
      }, 3000);
      return;
    }

    try {
      const profileImageToSave =
        formData.profileImage === studentHat
          ? DEFAULT_STUDENT_IMAGE_KEY
          : formData.profileImage;

      const payload = {
        ...formData,
        profileImage: profileImageToSave,
        links: cleanedLinks,
      };

      const res = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let errorMessage = `Det gick inte att spara registreringen (status ${res.status})`;
        const contentType = res.headers.get("content-type") || "";

        if (contentType.includes("application/json")) {
          const errorData = await res.json();
          errorMessage = errorData.error || errorMessage;
        } else {
          const errorText = await res.text();
          if (res.status === 413) {
            errorMessage =
              "Bilden är för stor att skicka. Välj en mindre bild eller komprimera den.";
          } else if (res.status === 502 || res.status === 504) {
            errorMessage =
              "Backend svarar inte. Kontrollera att servern körs och att DB_URI i .env är korrekt.";
          } else if (errorText?.trim()) {
            errorMessage = errorText;
          }
        }

        throw new Error(errorMessage);
      }

      const responseData = await res.json();
      console.log("Svar från servern:", responseData);

      setFormData({
        name: "",
        education: "",
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
            id="profileImageLibrary"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <input
            className="hiddenFileInput"
            id="profileImageCamera"
            type="file"
            accept="image/*"
            capture="user"
            onChange={handleImageUpload}
          />
          <div className="profileImageActions">
            <details className="imageActionDropdown">
              <summary
                className="imageActionButton imageActionButtonSummary"
                aria-label="Lägg till bild"
              >
                <img
                  className="imageActionIcon"
                  src={studentPictureIcon}
                  alt=""
                  aria-hidden="true"
                />
              </summary>
              <div className="imageActionDropdownMenu">
                <label
                  className="imageActionMenuItem imageActionMenuItemCamera"
                  htmlFor="profileImageCamera"
                  onClick={closeImageMenu}
                >
                  Ta bild
                </label>
                <label
                  className="imageActionMenuItem imageActionMenuItemLibrary"
                  htmlFor="profileImageLibrary"
                  onClick={closeImageMenu}
                >
                  Kamerarulle
                </label>
              </div>
            </details>
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
          <label htmlFor="name">Kandidat *</label>
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
          <label htmlFor="education">Utbildning *</label>
          <select
            className="formInput"
            id="education"
            name="education"
            value={formData.education}
            onChange={handleChange}
            required
          >
            <option value="">Välj utbildning</option>
            <option value="Digital design">Digital design</option>
            <option value="Webbutvecklare">Webbutvecklare</option>
          </select>
        </div>

        <div>
          <label htmlFor="link-0">Länk</label>
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
              placeholder="Ex: min-portfolio / https://linkedin"
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
