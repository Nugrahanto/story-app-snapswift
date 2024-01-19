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
  
};
 
export default Utils;