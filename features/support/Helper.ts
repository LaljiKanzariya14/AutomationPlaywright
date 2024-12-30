
let value: string, browserVersion: string;

export function setValue(_value: string) {
    value = _value;
}

export function getValue(): string {
    return value;
}

export function setBrowserVersion(_browserVersion: string) {
    browserVersion = _browserVersion;
}

export function getBrowserVersion(): string {
    return browserVersion;
}

