import { upload, uploadSingle } from "../../src/middleware/upload";

describe("upload middleware", () => {
  describe("upload", () => {
    it("should be defined", () => {
      expect(upload).toBeDefined();
    });
  });

  describe("uploadSingle", () => {
    it("should create multer single upload for given field", () => {
      const uploader = uploadSingle("logbook");
      expect(uploader).toBeDefined();
      // It's a function that returns multer middleware
    });
  });
});
