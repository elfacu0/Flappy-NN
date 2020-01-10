class NeuralNetwork {
    constructor(w,b=0) {
        this.weights = w;
        this.bias = b;
        this.h1 = new Neuron([...this.weights], this.bias);
        this.h2 = new Neuron([...this.weights], this.bias);
        this.o = new Neuron([...this.weights], this.bias);
    }
    feedforward(x) {
        const output_h1 = this.h1.feedforward(x);
        const output_h2 = this.h2.feedforward(x);
        const output_o = this.o.feedforward([output_h1, output_h2]);
        return output_o;
    }
}