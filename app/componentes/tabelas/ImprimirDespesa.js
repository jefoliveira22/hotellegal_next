export class ImprimirDespesa {

    constructor(dadosParaImpressao) {
        this.dadosParaImpressao = dadosParaImpressao;
    }

    async preparaDocumento() {
        const corpoDocumento = this.criaCorpoDocumento();
        const documento = this.gerarDocumento(corpoDocumento);
        return documento;
    }

    criaCorpoDocumento() {
        const header = [
            { text: 'ID', bold: true, fontSize: 9, margin: [0, 4, 0, 0], alignment: 'center' },
            { text: 'PRODUTO', bold: true, fontSize: 9, margin: [0, 4, 0, 0], alignment: 'center' },
            { text: 'NFE', bold: true, fontSize: 9, margin: [0, 4, 0, 0], alignment: 'center' },
            { text: 'CATEGORIA', bold: true, fontSize: 9, margin: [0, 4, 0, 0], alignment: 'center' },
            { text: 'DATA', bold: true, fontSize: 9, margin: [0, 4, 0, 0], alignment: 'center' },
            { text: 'VALOR', bold: true, fontSize: 9, margin: [0, 4, 0, 0], alignment: 'center' },
            { text: 'FORNECEDOR', bold: true, fontSize: 9, margin: [0, 4, 0, 0], alignment: 'center' },
            { text: 'CNPJ', bold: true, fontSize: 9, margin: [0, 4, 0, 0], alignment: 'center' },
            { text: 'TELEFONE', bold: true, fontSize: 9, margin: [0, 4, 0, 0], alignment: 'center' },
            { text: 'E-MAIL', bold: true, fontSize: 9, margin: [0, 4, 0, 0], alignment: 'center' },
            { text: 'CIDADE', bold: true, fontSize: 9, margin: [0, 4, 0, 0], alignment: 'center' },
            { text: 'PAGO', bold: true, fontSize: 9, margin: [0, 4, 0, 0], alignment: 'center' },
        ];
        const body = this.dadosParaImpressao.map((item) => {
            let data_compra = new Date(item.data_comp);
            return [
                { text: item.id_despesa, fontSize: 8, alignment: 'center' },
                { text: item.nome_desp, fontSize: 8, alignment: 'center' },
                { text: item.nfe, fontSize: 8, alignment: 'center' },
                { text: item.fornecedor.categoria, fontSize: 8, alignment: 'center' },
                { text: data_compra.toLocaleDateString(), fontSize: 8, alignment: 'center' },
                { text: item.valortotal, fontSize: 8, alignment: 'center' },
                { text: item.fornecedor.razao_social, fontSize: 8, alignment: 'center' },
                { text: item.fornecedor.cnpj, fontSize: 8, alignment: 'center' },
                { text: item.fornecedor.usuario.telefone, fontSize: 8, alignment: 'center' },
                { text: item.fornecedor.usuario.email, fontSize: 8, alignment: 'center' },
                { text: item.fornecedor.usuario.cidade, fontSize: 8, alignment: 'center' },
                { text: item.pago, fontSize: 8, alignment: 'center' },
            ]
        });

        const lineHeader = [
            {
                text: '________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________',
                alignment: 'center',
                fontSize: 5,
                colSpan: 12,
            },
            {},
            {},
        ];

        let content = [header, lineHeader];
        content = [...content, ...body];
        return content;
    }

    gerarDocumento(corpoDocumento) {
        const documento = {
            pageSize: 'A4',
            pageOrientation: 'landscape',
            pageMargins: [15, 45, 14, 48],
            header: function () {
                return {
                    margin: [14, 12, 14, 0],
                    layout: 'noBorders',
                    table: {
                        widths: ['*'],
                        body: [
                            [
                                { text: 'RELATÓRIO DE DESPESAS - PERIODO', style: 'reportName' }
                            ]
                        ],
                    },
                };
            },
            content: [
                {
                    layout: 'noBorders',
                    table: {
                        headerRows: 1,
                        widths: [10, 90, 50, 100, 50, 40, 120, 70, 50, 70, 45, 30],

                        body: corpoDocumento
                    }
                },
            ],
            footer(currentPage, pageCount) {
                return {
                    layout: 'noBorders',
                    margin: [14, 0, 14, 22],
                    table: {
                        widths: ['auto'],
                        body: [
                            [
                                {
                                    text:
                                        '______________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________',
                                    alignment: 'center',
                                    fontSize: 5,
                                },
                            ],
                            [
                                [
                                    {
                                        text: `Página ${currentPage.toString()} de ${pageCount}`,
                                        fontSize: 7,
                                        alignment: 'right',
                                        /* horizontal, vertical */
                                        margin: [3, 0],
                                    },
                                    {
                                        text: 'HotelLegal - Sistema de Hotelaria',
                                        fontSize: 7,
                                        alignment: 'center',
                                    },
                                ],
                            ],
                        ],
                    },
                };
            },
            styles: {
                reportName: {
                    fontSize: 9,
                    bold: true,
                    alignment: 'center',
                    margin: [0, 4, 0, 0],
                }
            },

        };
        return documento;
    }
}