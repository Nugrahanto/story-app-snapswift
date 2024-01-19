import { msg } from '@lit/localize';

const Utils = {
  getUserSession(key) {
    return sessionStorage.getItem(key);
  },

  setMultipleSessionStorage(data) {
    Object.entries(data).forEach(([key, value]) => {
      return sessionStorage.setItem(key, value);
    });
  },

  removeSessionStorage() {
    sessionStorage.clear();
  },

  setToast(message, status = null) {
    if (status) {
      const toastContainer = document.getElementById('toastContainer');
      while (toastContainer.firstChild) {
        toastContainer.firstChild.remove();
      }
    }

    const toastDiv = document.createElement('div');

    if (status) {
      toastDiv.style.backgroundColor = '#ffc0cb';
    } else {
      toastDiv.style.backgroundColor = '#e9ecef';
    }
    toastDiv.style.borderRadius = '8px';
    toastDiv.style.padding = '15px';
    toastDiv.style.marginBottom = '10px';
    toastDiv.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';

    toastDiv.innerHTML = message;

    if (status) {
      document.getElementById('toastContainer').appendChild(toastDiv);
      if (status === 'success') {
        return 'success';
      } else {
        return 'error';
      }
    } else {
      return document.getElementById('toastContainer').appendChild(toastDiv);
    }
  },

  getUserLastName(fullName) {
    const lastSpaceIndex = fullName.lastIndexOf(' ');

    let lastName;

    if (lastSpaceIndex !== -1) {
      return lastName = fullName.slice(lastSpaceIndex + 1);
    } else {
      return lastName = fullName;
    }
  },

  setFormatCreatedAt(isoDateString) {
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
      return `${seconds} ${msg(`seconds ago`)} - ${formattedDate}`;
    } else if (minutes < 60) {
      return `${minutes} ${msg(`minutes ago`)} - ${formattedDate}`;
    } else if (hours < 24) {
      return `${hours} ${msg(`hours ago`)} - ${formattedDate}`;
    } else if (days < 7) {
      return `${days} ${msg(`days ago`)} - ${formattedDate}`;
    } else if (weeks < 4) {
      return `${weeks} ${msg(`weeks ago`)} - ${formattedDate}`;
    } else if (months < 12) {
      return `${months} ${msg(`months ago`)} - ${formattedDate}`;
    } else {
      return `${years} ${msg(`years ago`)} - ${formattedDate}`;
    }
  }
  
};
 
export default Utils;