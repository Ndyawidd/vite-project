export class AddPresenter {
  constructor(view) {
    this.view = view;
    this.storyModel = new StoryModel();
  }

  async submitStory(formData) {
    try {
      // Validate data
      const validation = this.validateStoryData(formData);
      if (!validation.isValid) {
        this.view.showError(validation.message);
        return;
      }

      this.view.showSubmitLoading();

      const result = await this.storyModel.createStory(formData);

      this.view.showSubmitSuccess("Story berhasil dikirim!");

      // Navigate after delay
      setTimeout(() => {
        this.view.navigateToHome();
      }, 1500);
    } catch (error) {
      this.view.showSubmitError(`Gagal mengirim story: ${error.message}`);
    }
  }

  validateStoryData(data) {
    if (!data.description || data.description.trim().length === 0) {
      return { isValid: false, message: "Deskripsi wajib diisi" };
    }

    if (!data.photo) {
      return { isValid: false, message: "Gambar wajib dipilih atau diambil" };
    }

    if (data.description.length > 500) {
      return { isValid: false, message: "Deskripsi maksimal 500 karakter" };
    }

    return { isValid: true };
  }
}
