function autoResizeTextarea(textarea) {
  textarea.style.height = "auto"; // Өндрийг автоматаар тохируулах
  console.log("scrollHeight", textarea.scrollHeight);
  textarea.style.height = textarea.scrollHeight + 5 + "px"; // Scroll height-ийг ашиглах
}

function initEditor(page) {
  init(page);

  const textarea = document.getElementById("titleTextarea");

  if (textarea) {
    // Input үед auto-resize функцийг дуудах
    textarea.addEventListener("input", function () {
      autoResizeTextarea(this);
    });

    // Эхлэх үед auto-resize функцийг дуудах
    autoResizeTextarea(textarea);
  }

  const subTextarea = document.getElementById("subtitleTextarea");

  if (subTextarea) {
    // Input үед auto-resize функцийг дуудах
    subTextarea.addEventListener("input", function () {
      autoResizeTextarea(this);
    });

    // Эхлэх үед auto-resize функцийг дуудах
    autoResizeTextarea(subTextarea);
  }

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];

  const quill = new Quill("#editor", {
    modules: {
      toolbar: false,
    },
    placeholder: "Нийтлэл бичих...",
    theme: "snow",
  });

  //   quill.setText("Hello\nGood\nWorld!");
  //   quill.formatLine(1, 1, "list", "bullet");
  //   quill.formatLine(2, 2, "list", "bullet");

  const toggleBoldButton = document.getElementById("btnBold");
  if (toggleBoldButton) {
    toggleBoldButton.addEventListener("click", function () {
      if (quill.getFormat().bold) {
        quill.format("bold", false);
      } else {
        quill.format("bold", true);
      }
    });
  }

  const toggleItallcButton = document.getElementById("btnItalic");
  if (toggleItallcButton) {
    toggleItallcButton.addEventListener("click", function () {
      if (quill.getFormat().italic) {
        quill.format("italic", false);
      } else {
        quill.format("italic", true);
      }
    });
  }

  // strike button, code block button, link button, image button, header button, color button, background button, font button, align button, clean button
  const toggleStrikeButton = document.getElementById("btnStrike");
  if (toggleStrikeButton) {
    toggleStrikeButton.addEventListener("click", function () {
      if (quill.getFormat().strike) {
        quill.format("strike", false);
      } else {
        quill.format("strike", true);
      }
    });
  }

  const toggleCodeBlockButton = document.getElementById("btnCodeBlock");
  if (toggleCodeBlockButton) {
    toggleCodeBlockButton.addEventListener("click", function () {
      if (quill.getFormat().code) {
        quill.format("code", false);
      } else {
        quill.format("code", true);
      }
    });
  }

  const toggleLinkButton = document.getElementById("btnLink");
  if (toggleLinkButton) {
    toggleLinkButton.addEventListener("click", function () {
      const url = prompt("Enter the URL");
      if (url) {
        quill.format("link", url);
      }
    });
  }

  const toggleImageButton = document.getElementById("btnImage");
  const input = document.getElementById("quillImage");
  if (toggleImageButton) {
    toggleImageButton.addEventListener("click", function () {
      // open file input
      console.log("hello");
      input.click();

      input.addEventListener("change", function () {
        const file = input.files[0];
        if (file) {
          const formData = new FormData();
          formData.append("image", file);

          // api duudaj url uguh
          //   fetch("/api/upload", {
          //     method: "POST",
          //     body: formData,
          //   })
          //     .then((response) => response.json())
          //     .then((data) => {
          //       const url = data.url;
          //       quill.format("image", url);
          //     });
        }
      });
    });
  }

  const toggleUlButton = document.getElementById("btnUl");
  if (toggleUlButton) {
    toggleUlButton.addEventListener("click", function () {
      if (quill.getFormat().list === "bullet") {
        quill.format("list", false);
      } else {
        quill.format("list", "bullet");
      }
    });
  }

  const toggleOlButton = document.getElementById("btnOl");
  if (toggleOlButton) {
    toggleOlButton.addEventListener("click", function () {
      if (quill.getFormat().list === "ordered") {
        quill.format("list", false);
      } else {
        quill.format("list", "ordered");
      }
    });
  }
}
