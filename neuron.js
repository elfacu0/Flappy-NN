
class Neuron {
    constructor(w, bias) {
        this.weights = w;
        this.bias = bias;
    }

    feedforward(x) {
        let output = 0;
        for(let i = 0; i<x.length;i++){
            output += x[i] * this.weights[i];
        }
        return this.sigmoid(output+this.bias);
    }

    sigmoid(value) {
        const pow_e = Math.pow(2.718, value)
        return (pow_e / (pow_e + 1))
    }
}