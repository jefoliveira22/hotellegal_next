export class ImprimirHospedagem {

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
            { text: 'NOME', bold: true, fontSize: 9, margin: [0, 4, 0, 0], alignment: 'center' },
            { text: 'TELEFONE', bold: true, fontSize: 9, margin: [0, 4, 0, 0], alignment: 'center' },
            { text: 'E-MAIL', bold: true, fontSize: 9, margin: [0, 4, 0, 0], alignment: 'center' },
            { text: 'CIDADE', bold: true, fontSize: 9, margin: [0, 4, 0, 0], alignment: 'center' },
            { text: 'ENTRADA', bold: true, fontSize: 9, margin: [0, 4, 0, 0], alignment: 'center' },
            { text: 'SAIDA', bold: true, fontSize: 9, margin: [0, 4, 0, 0], alignment: 'center' },
            { text: 'TOTAL', bold: true, fontSize: 9, margin: [0, 4, 0, 0], alignment: 'center' },
            { text: 'ATIVO', bold: true, fontSize: 9, margin: [0, 4, 0, 0], alignment: 'center' },
        ];
        const body = this.dadosParaImpressao.map((item) => {
            let data_ini = new Date(item.data_ini)
            let data_fim = new Date(item.data_fim)
            return [
                { text: item.id_hospedagem, fontSize: 8, alignment: 'center' },
                { text: item.reserva.hospede.usuario.nome, fontSize: 8, alignment: 'center' },
                { text: item.reserva.hospede.usuario.telefone, fontSize: 8, alignment: 'center' },
                { text: item.reserva.hospede.usuario.email, fontSize: 8, alignment: 'center' },
                { text: item.reserva.hospede.usuario.cidade, fontSize: 8, alignment: 'center' },
                { text: data_ini.toLocaleDateString(), fontSize: 8, alignment: 'center' },
                { text: item.data_fim ? data_fim.toLocaleDateString() : "", fontSize: 8, alignment: 'center' },
                { text: item.valor_tot, fontSize: 8, alignment: 'center' },
                { text: item.h_ativo, fontSize: 8, alignment: 'center' },
            ]
        });

        const lineHeader = [
            {
                text: '______________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________',
                alignment: 'center',
                fontSize: 5,
                colSpan: 9,
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
            pageMargins: [10, 45, 14, 48],
            header: function () {
                return {
                    margin: [14, 12, 14, 0],
                    layout: 'noBorders',
                    table: {
                        widths: ['*'],
                        body: [
                            [
                                { text: 'RELATÓRIO DE HOSPEDAGENS - PERIODO', style: 'reportName' }
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
                        widths: [20, 120, 50, 120, 40, 50, 50, 30, 30],

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
                                        '_________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________',
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