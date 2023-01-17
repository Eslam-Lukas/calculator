////////[1] body/////////
let page = document.getElementById('container');
////////[2] Nav bar/////////
let nav = document.getElementById('nav'),
	themeBar = document.getElementById('bar'),
	color = document.getElementById('color');
// creat ul li by loop
for (let i = 0; i < 3; i++) {
	let ul = document.createElement('ul'),
		text = document.createTextNode(i + 1),
		span = document.createElement('span');
	span.className = `a${i + 1}`;
	ul.className = `a${i + 1}`;
	ul.appendChild(text);
	ul.appendChild(span);
	color.appendChild(ul);
}
////////[2] Screen/////////
let screen = document.getElementById('screen'),
	inp = document.getElementById('num-in');
////////[3] buttons/////////
let buttons = document.getElementById('buttons'),
	del = document.getElementById('del'),
	plus = document.getElementById('plus'),
	min = document.getElementById('min'),
	by = document.getElementById('by'),
	mult = document.getElementById('mult'),
	result = document.getElementById('equal'),
	clear = document.getElementById('clear'),
	num = document.querySelectorAll('.num'),
	runMath = [],
	runNum = [plus, min, by, mult],
	re = 0,
	classes = [page, nav, themeBar, color, screen, inp, buttons];

//// Math part
///////////[1] Add btn value to inp//////////////
num.forEach((e) => {
	e.addEventListener('click', () => {
		if (e.textContent === '.') {
			inp.value = `${inp.value}`;
		} else {
			inp.value = `${inp.value}${parseFloat(e.textContent)}`;
		}
	});
});
///////// [2] Do the math
runNum.forEach((e) => {
	e.addEventListener('click', () => {
		if (inp.value !== '') {
			runMath.push(inp.value);
			if (runMath.length >= 3) {
				inp.value = doTheMath(runMath);
				runMath = [inp.value, e.value];
				inp.placeholder = inp.value;
				inp.value = '';
				return;
			}
			runMath.push(e.value);
			inp.value = '';
		}
	});
});
function doTheMath(arr) {
	let k;
	switch (arr[1]) {
		case (arr[1].value = '+'):
			k = parseFloat(arr[0]) + parseFloat(arr[2]);
			break;
		case (arr[1].value = '-'):
			k = parseFloat(arr[0]) - parseFloat(arr[2]);
			break;
		case (arr[1].value = '*'):
			k = parseFloat(arr[0]) * parseFloat(arr[2]);
			break;
		case (arr[1].value = '/'):
			k = parseFloat(arr[0]) / parseFloat(arr[2]);
			break;
	}
	return k;
}
//////// [3] del & clear & equal
clear.onclick = () => {
	inp.value = '';
	inp.placeholder = 'Lukas';
	runMath = [];
};
result.onclick = () => {
	if (inp.value !== inp.placeholder) {
		runMath.push(inp.value);
		inp.value = doTheMath(runMath);
		re = inp.value;
		inp.placeholder = re;
	} else if (inp.placeholder !== 'Lukas') {
		inp.value = inp.placeholder;
		re = inp.value;
	}
	setTimeout(() => {
		if (inp.placeholder !== 'Lukas') {
			clear.click();
			if (re !== '') {
				inp.placeholder = `Final result ${re}`;
			}
		}
	}, 5000);
};
del.addEventListener('click', () => {
	if (inp.value.length > 0 || inp.value !== '') {
		inp.value = parseFloat(
			inp.value.split('').reverse().slice(1).reverse().join(''),
		);
	}
});
////  color part
let ul = document.querySelectorAll('#color > ul'),
	span = document.querySelectorAll('#color > ul > span'),
	button = document.querySelectorAll('button');
// colors function
span.forEach((e) => {
	e.addEventListener('click', () => {
		span.forEach((ele) => {
			ele.classList.remove('active');
		});
		e.classList.add('active');
		theme();
		modify(e);
	});
});
function theme() {
	for (let i = 0; i < button.length; i++) {
		if (span[1].classList.contains('active')) {
			button[i].classList.add('a2');
			button[i].classList.remove('a3');
		} else if (span[2].classList.contains('active')) {
			button[i].classList.add('a3');
			button[i].classList.remove('a2');
		} else {
			button[i].classList.remove('a3');
			button[i].classList.remove('a2');
		}
	}
	// else classes
	for (let i = 0; i < classes.length; i++) {
		if (span[1].classList.contains('active')) {
			classes[i].classList.add('a2');
			classes[i].classList.remove('a3');
		} else if (span[2].classList.contains('active')) {
			classes[i].classList.add('a3');
			classes[i].classList.remove('a2');
		} else {
			classes[i].classList.remove('a2');
			classes[i].classList.remove('a3');
		}
	}
}
//// local storge
let storgeOpj = {};
function modify(spa) {
	storgeOpj.parentClass = spa.parentElement.className;
	storgeOpj.activClass = spa.className;
	addToLoacal();
}
function addToLoacal() {
	localStorage.setItem('theme', JSON.stringify(storgeOpj));
}
function returnLocal() {
	if (localStorage.theme) {
		let checkActive = Array.from(color.children),
			myOpj = JSON.parse(localStorage.theme);
		checkActive.filter((ele) => {
			ele.className === myOpj.parentClass
				? (ele.firstElementChild.className = myOpj.activClass)
				: '';
		});
	}
}
returnLocal();
theme();
