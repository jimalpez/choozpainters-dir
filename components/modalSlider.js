export default class ModalSlider {
    constructor(modalSelector, imagesArray, startIndex = 0) {
      this.modalElement = document.querySelector(modalSelector);
      this.modalBody = this.modalElement?.querySelector(".modal-body");
      this.imagesArray = imagesArray;
      this.imageIndex = startIndex;
      
      if (!this.modalElement || !this.modalBody) {
        console.error("Modal element or modal body not found!");
        return;
      }
  
      this.initEvents();
    }
  
    initEvents() {
      this.modalElement.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") this.prevImage();
        if (e.key === "ArrowRight") this.nextImage();
      });
    }
  
    show() {
      this.updateModalContent();
      const modalInstance = new bootstrap.Modal(this.modalElement);
      modalInstance.show();
    }
  
    updateModalContent() {
      if (!this.modalBody) return;
  
      this.modalBody.innerHTML = `
        <div class="modal-slider" style="position: relative;">
          <button class="modal-close" style="position: absolute; top: 10px; right: 10px; background: none; border: none; font-size: 24px; cursor: pointer;">&times;</button>
          <button class="modal-prev">&larr;</button>
          <img src="${this.imagesArray[this.imageIndex]}" 
               alt="Gallery Image ${this.imageIndex + 1}" 
               class="img-fluid"/>
          <button class="modal-next">&rarr;</button>
        </div>
      `;
  
      this.modalBody.querySelector(".modal-prev").addEventListener("click", () => this.prevImage());
      this.modalBody.querySelector(".modal-next").addEventListener("click", () => this.nextImage());
      this.modalBody.querySelector(".modal-close").addEventListener("click", () => {
        const modalInstance = bootstrap.Modal.getInstance(this.modalElement);
        modalInstance.hide();
      });
    }
  
    prevImage() {
      this.imageIndex = (this.imageIndex - 1 + this.imagesArray.length) % this.imagesArray.length;
      this.updateModalContent();
    }
  
    nextImage() {
      this.imageIndex = (this.imageIndex + 1) % this.imagesArray.length;
      this.updateModalContent();
    }
  }
  