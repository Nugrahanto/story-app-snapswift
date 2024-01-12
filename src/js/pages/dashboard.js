const Dashboard = {

  async init() {
    await this._initialData();
  },

  async _initialData() {
    try {
      const response = await fetch('https://raw.githubusercontent.com/dicodingacademy/a565-webtools-labs/099-shared-files/proyek-awal/DATA.json');
      const data = await response.json();

      this._createStoryCards(data.listStory);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },

  _createStoryCards(listStory = null) {
    const cardContainer = document.getElementById('card-container');

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
            description="${story.description.slice(0, 100)}..."
            createdAt="${this._formatCreatedAt(story.createdAt)}"
        ></card-story>
      </div>
    </div>
    `;
  },

  _formatCreatedAt(isoDateString) {
    const date = new Date(isoDateString);
    const now = new Date();

    const timeDifference = now - date;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30); // Perkiraan 30 hari per bulan
    const years = Math.floor(days / 365); // Perkiraan 365 hari per tahun

    const formattedDate = date.toLocaleString('id-ID', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    if (seconds < 60) {
      return `${seconds} seconds ago - ${formattedDate}`;
    } else if (minutes < 60) {
      return `${minutes} minutes ago - ${formattedDate}`;
    } else if (hours < 24) {
      return `${hours} hours ago - ${formattedDate}`;
    } else if (days < 7) {
      return `${days} days ago - ${formattedDate}`;
    } else if (weeks < 4) {
      return `${weeks} weeks ago - ${formattedDate}`;
    } else if (months < 12) {
      return `${months} months ago - ${formattedDate}`;
    } else {
      return `${years} years ago - ${formattedDate}`;
    }
  }
};
 
export default Dashboard;