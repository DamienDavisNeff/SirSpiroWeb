// Function to generate a random number between min and max
function random(min, max) {
    return Math.random() * (max - min) + min;
}

// gets the page aspect ratio
function getAspectRatio() {
    return reduceFraction(window.innerWidth,window.innerHeight);
}

// reduces fraction
function reduceFraction(numerator, denominator) {
    var gcd = function gcd(a,b) {
        return b ? gcd(b, a%b) : a;
    }; gcd = gcd(numerator,denominator);
    return [numerator/gcd,denominator/gcd];
}