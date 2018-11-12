class Options {
	constructor(height, width, bg, fontSize, textAlign, string) {
		this.height = height;
		this.width = width;
		this.bg = bg;
		this.fontSize = fontSize;
		this.textAlign = textAlign;
		this.string = string;
	}

	createEl() {
		let elem = document.createElement('div');
		document.body.appendChild(elem);
		let text = `height: ${this.height}px; width: ${this.width}px; background: ${this.bg}; font-size: ${this.fontSize}px; text-align: ${this.textAlign};`;
		elem.style.cssText = text;
		elem.textContent = this.string;
	}
}

let el = new Options(600, 350, 'orangered', 25, 'center', 'Hello all!');
el.createEl();
