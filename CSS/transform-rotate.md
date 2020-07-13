# transform-rotate

*以下是水平旋转*
HTML
```html
<div class="cards">
	<div class="card">
    	<div class="front">	正面 </div>
        <div class="back"> 反面 </div>
    </div>
</div>
```

CSS
```css
.cards {
    perspective: 1000px;
    position: relative;
    margin-top: 30px;
    width: 500px;
    height: 300px;
    transform-style: preserve-3d;
}
.card {
    position: relative;
    transform-style: preserve-3d;
    transition: .6s;
}
.card-front,
.card-back {
    backface-visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 500px;
    height: 300px;
    border: 1px solid #000;
}
.card-front {
    z-index: 2;
}
.card-back {
    transform: rotateY(-180deg);
}
.cards:hover .card {
    transform: rotateY(180deg)
}
```