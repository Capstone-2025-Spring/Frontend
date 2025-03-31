// src/util/pdf/pdfHandler.js

export const handlePdfUploadWithValidation = (event, callback) => {
  const file = event.target.files[0];

  if (!file) return;

  if (file.type !== "application/pdf") {
    alert("PDF 파일만 업로드 가능합니다.");
    return;
  }

  // 상태 업데이트 (callback: update_user_option 등)
  callback("pdf_file", file);
};
