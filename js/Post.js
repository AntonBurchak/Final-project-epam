class Post {
    constructor(post) {
        for (const key in post) {
            if (post.hasOwnProperty(key)) {
                this[key] = post[key]
            }
        }
        this._type = 'defualt';
    }

    insertImage() {
        return `<div class="blogPosts__item-img">
                        <img src="${this.image}" alt="">
                </div>`
    }

    get getPost() {
        return `
                <article class="blogPosts__item  blogPosts__item--${this._type}">
                  ${this.image.indexOf('http') !== -1 ? this.insertImage() : ''}
                  <div class="blogPosts__item-text">
                     <div>
                        <div class="blogPosts__item-info">
                           <div class="blogPosts__item-author">
                              <img src="images/Grace.png" alt="">
                           </div>
                           <div class="blogPosts__item-postinfo">
                              <p class="blogPosts__item-authorName">${this.author}</p>
                              <div class="posts__item-info">
                                 <time class="posts__item-date" datetime="${this.date}">${Parser.formatDate(this.date)}</time>
                                 <p class="posts__item-timeRead">${Math.ceil(this.text.length / 1400)} min read</p>
                                 <p class="posts__item-comments">
                                    <img src="images/a-icon-comment.svg" alt="">
                                    <span class="posts__item-quantity-comments">${this.comments.length}</span>
                                 </p>
                                 <div class="posts__item-stars">
                                    ${Parser.renderStars(this)}
                                 </div>
                              </div>
                           </div>
                        </div>
                        <h2 class="blogPosts__item-heading">${this.title.length > 45 ? this.title.slice(0, 45).trim() + '...' : this.title}</h2>
                        <p class="blogPosts__item-pretext">${this.description}</p>
                        <a href="http://localhost:3000/post.html?id=${this.id}" class="blogPosts__item-more">Read more</a>
                     </div>
                    </div>
               </article>`
    }

    get getType() {
        return this._type;
    }
}

class PostText extends Post {
    constructor(post) {
        super(post);
        this._type = 'text';
    }
}

class PostVideo extends Post {
    constructor(post) {
        super(post);
        this._type = 'video';
    }
}

class PostAudio extends Post {
    constructor(post) {
        super(post);
        this._type = 'audio';
    }
}

class PostPicture extends Post {
    constructor(post) {
        super(post);
        this._type = 'picture';
    }
}