import { StoryModel } from "../models/story-model.js";

export class HomePresenter {
  constructor(view) {
    this.view = view;
    this.storyModel = new StoryModel();
  }

  async loadStories() {
    try {
      this.view.showLoading();
      const stories = await this.storyModel.fetchStories();
      
      // Process data for view
      const processedStories = stories.map(story => ({
        id: story.id,
        name: story.name,
        description: story.description,
        photoUrl: story.photoUrl,
        createdAt: new Date(story.createdAt).toLocaleString('id-ID'),
        hasLocation: !!(story.lat && story.lon),
        lat: story.lat,
        lon: story.lon
      }));

      this.view.displayStories(processedStories);
      this.view.displayStoriesOnMap(this.storyModel.getStoriesWithLocation());
      this.view.hideLoading();
    } catch (error) {
      this.view.showError(`Gagal memuat story: ${error.message}`);
      this.view.hideLoading();
    }
  }
}
