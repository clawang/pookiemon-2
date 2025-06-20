export function drawTextWithShadow(textContent, x, y, maxWidth) {
    fill(102, 88, 113);
    text(textContent, x + 3, y + 3, maxWidth);
    text(textContent, x, y + 3, maxWidth);
    text(textContent, x + 3, y, maxWidth);
    fill(255);
    text(textContent, x, y, maxWidth);
}

export function drawWhiteTextWithGreyShadow(textContent, x, y, maxWidth) {
    fill(113, 113, 113);
    text(textContent, x + 3, y + 3, maxWidth);
    text(textContent, x, y + 3, maxWidth);
    text(textContent, x + 3, y, maxWidth);
    fill(255);
    text(textContent, x, y, maxWidth);
}

export function drawBlackTextWithShadow(textContent, color, x, y, maxWidth) {
    fill(224, 220, 219);
    if (color === 1) {
        fill(243, 220, 167);
    }
    text(textContent, x + 3, y + 3, maxWidth);
    text(textContent, x, y + 3, maxWidth);
    text(textContent, x + 3, y, maxWidth);
    fill(70, 73, 71);
    if (color === 1) {
        fill(201, 52, 18);
    }
    text(textContent, x, y, maxWidth);
}

export function drawYellowTextWithShadow(textContent, x, y, maxWidth) {
    fill(219, 217, 184)
    text(textContent, x + 2, y + 2, maxWidth);
    text(textContent, x, y + 2, maxWidth);
    text(textContent, x + 2, y, maxWidth);
    fill(70, 73, 71);
    text(textContent, x, y, maxWidth);
}

export function typeWriter(str, props) {
    const result = str.substring(0, props.currentCharacter);
    if (props.currentCharacter < str.length) {
        props.currentCharacter++;
        props.buttonLocked = true;
    } else {
        props.buttonLocked = false;
    }
    return result;
}