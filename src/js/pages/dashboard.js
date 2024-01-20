import CheckUserAuth from './accounts/check-user-auth';
import Stories from '../network/stories';

const Dashboard = {

  currentPage: 1,
  pageSize: 5,
  loading: false,

  async init() {
    CheckUserAuth.checkLoginState();
    await this._initialData();
    this._setupScrollListener();
  },

  async _initialData() {
    try {
      const response = await Stories.getAll(this.currentPage, this.pageSize);
      const responseRecords = response.data.listStory;

      this._createStoryCards(responseRecords);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },

  _setupScrollListener() {
    window.addEventListener('scroll', () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight - 500 && !this.loading) {
        this._loadMoreData();
      }
    });
  },

  async _loadMoreData() {
    try {
      this.loading = true;
      const nextPage = this.pageSize + 5;
      const response = await Stories.getAll(this.currentPage, nextPage);
      const responseRecords = response.data.listStory;

      if (responseRecords.length > 0) {
        this.pageSize = nextPage;
        this._createStoryCards(responseRecords);
      }
    } catch (error) {
      console.error('Error fetching more data:', error);
    } finally {
      this.loading = false;
    }
  },

  _createStoryCards(listStory = null) {
    const cardContainer = document.getElementById('card-container');

    cardContainer.innerHTML = '';

    listStory.forEach(story => {
      cardContainer.innerHTML += this._createCardElements(story);
    });
  },

  _createCardElements(story) {
    return `
    <div class="col-lg-12 col-md-12 col-sm-12 mx-auto mb-3">
      <div class="container pl-5 pr-5">
        <card-story
            id="${story.id}"
            name="${story.name}"
            photoUrl="${story.photoUrl}"            
            location="${story.lat}, ${story.lon}"
            description="${story.description}"
            createdAt="${story.createdAt}"
        ></card-story>
      </div>
    </div>
    `;
  },

};
 
export default Dashboard;