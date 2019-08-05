/**
 * CardContent
 * @param {string} title - The Title of the Card Content
 * @param {string} description - The Description of the Card Content
 * @param {string} photo - The Background Photo of the Card
 * @param {string} lazyPhoto - The Low res Background Photo of the Card that will be loaded first
 * @constructor
 */
export default function CardContent(title, description, photo, lazyPhoto) {
  this.title = title;
  this.description = description;
  this.photo = photo;
  this.lazyPhoto = lazyPhoto;
}
