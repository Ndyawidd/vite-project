import CONFIG from "../config.js";

export class StoryModel {
  constructor() {
    this.stories = [];
    this.loading = false;
  }

  async fetchStories() {
    try {
      this.loading = true;
      const token = localStorage.getItem("token");

      const response = await fetch(`${CONFIG.BASE_URL}/stories?location=1`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch stories");
      }

      const data = await response.json();
      this.stories = data.listStory || [];
      return this.stories;
    } catch (error) {
      console.error("❌ StoryModel.fetchStories:", error);
      throw error;
    } finally {
      this.loading = false;
    }
  }

  async createStory(storyData) {
    try {
      this.loading = true;
      const formData = new FormData();

      // Build form data
      Object.keys(storyData).forEach((key) => {
        if (storyData[key] !== null && storyData[key] !== undefined) {
          formData.append(key, storyData[key]);
        }
      });

      const response = await fetch(`${CONFIG.BASE_URL}/stories/guest`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || result.error) {
        throw new Error(result.message || "Failed to create story");
      }

      return result;
    } catch (error) {
      console.error("❌ StoryModel.createStory:", error);
      throw error;
    } finally {
      this.loading = false;
    }
  }

  getStoriesCount() {
    return this.stories.length;
  }

  getStoriesWithLocation() {
    return this.stories.filter((story) => story.lat && story.lon);
  }

  isLoading() {
    return this.loading;
  }
}
