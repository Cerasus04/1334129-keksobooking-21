'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const DEFAULT_AVATAR_SRC = `img/muffin-grey.svg`;

const StylesToPreview = {
  avatar: {
    default: {
      width: `40px`,
      height: `44px`,
      borderRadius: `0`,
      marginLeft: `0`,
    },
    edited: {
      width: `70px`,
      height: `70px`,
      borderRadius: `5px`,
      marginLeft: `-15px`,
    },
  },
  images: {
    edited: {
      width: `70px`,
      height: `70px`,
      borderRadius: `5px`,
    },
  }
};

const addForm = document.querySelector(`.ad-form`);
const avatarFileName = addForm.querySelector(`#avatar`);
const avatarPreview = addForm.querySelector(`.ad-form-header__preview img`);
const imagesFileName = addForm.querySelector(`#images`);
const imageContainer = addForm.querySelector(`.ad-form__photo`);

const fileChooser = (file, onCheckPassed) => {
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    onCheckPassed(file);
  }
};

const loadAvatar = (fileName) => {
  const editedStyle = StylesToPreview.avatar.edited;

  const onAvatarLoad = () => {
    URL.revokeObjectURL(avatarPreview.src);
    avatarPreview.removeEventListener(`load`, onAvatarLoad);
  };

  avatarPreview.addEventListener(`load`, onAvatarLoad);
  avatarPreview.src = URL.createObjectURL(fileName);

  avatarPreview.style.width = editedStyle.width;
  avatarPreview.style.height = editedStyle.height;
  avatarPreview.style.borderRadius = editedStyle.borderRadius;
  avatarPreview.style.marginLeft = editedStyle.marginLeft;
};

const loadImage = (fileName) => {
  const imageElement = document.createElement(`img`);
  const editedStyle = StylesToPreview.avatar.edited;

  const onImageLoad = () => {
    URL.revokeObjectURL(imageElement.src);
    imageElement.removeEventListener(`load`, onImageLoad);
  };

  imageElement.addEventListener(`load`, onImageLoad);
  imageElement.src = URL.createObjectURL(fileName);

  imageContainer.textContent = ``;
  imageElement.style.width = editedStyle.width;
  imageElement.style.height = editedStyle.height;
  imageElement.style.borderRadius = editedStyle.borderRadius;

  imageContainer.appendChild(imageElement);
};

const onAvatarFileNameChange = () => {
  fileChooser(avatarFileName.files[0], loadAvatar);
};

const onImagesFileNameChange = () => {
  fileChooser(imagesFileName.files[0], loadImage);
};

const setEnabledImg = () => {
  avatarFileName.addEventListener(`change`, onAvatarFileNameChange);
  imagesFileName.addEventListener(`change`, onImagesFileNameChange);
};

const setDisabledImg = () => {
  const defaultStyle = StylesToPreview.avatar.default;

  avatarPreview.style.width = defaultStyle.width;
  avatarPreview.style.height = defaultStyle.height;
  avatarPreview.style.borderRadius = defaultStyle.borderRadius;
  avatarPreview.style.marginLeft = defaultStyle.marginLeft;
  avatarPreview.src = DEFAULT_AVATAR_SRC;

  imageContainer.textContent = ``;

  avatarFileName.removeEventListener(`change`, onAvatarFileNameChange);
  imagesFileName.removeEventListener(`change`, onImagesFileNameChange);
};

window.load = {
  addForm,
  setDisabledImg,
  setEnabledImg
};
