// Um teste é inicializado com sua descrição, no caso, a função describe()
// Essa função recebe dois parâmetros, um nome e uma função(dentro desta função estarão os testes)
describe("Conceitos básicos de testes com jest", () => {
    // Cada função it() representa um teste
    // Primeiro parâmetro: Descrição daquele teste
    // Segundo parâmetro: Função que retorne o teste
    it("Deve ser possivel somar 2 numeros", () => {
        // expect() -> teste a ser rodado
        // toBe() -> resultado esperado
        expect(2 + 2).toBe(4);
    });

    it("Deve ser possivel somar 2 numeros", () => {
        expect(2 + 2).not.toBe(6);
    });
});