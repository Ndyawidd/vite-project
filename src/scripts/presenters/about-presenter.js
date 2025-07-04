import { StoryModel } from "../models/story-model.js";

export class AboutPresenter {
  constructor(view) {
    this.view = view;
    this.storyModel = new StoryModel();
  }

  async loadStatistics() {
    try {
      this.view.showLoadingStats();
      await this.storyModel.fetchStories();
      const totalStories = this.storyModel.getStoriesCount();
      this.view.displayStatistics(totalStories);
    } catch (error) {
      this.view.showStatsError();
    }
  }
}
