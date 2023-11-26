export class ImprimirCheckin {

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
            { text: 'QUARTO', bold: true, fontSize: 9, margin: [0, 4, 0, 0], alignment: 'center' },
            { text: 'ACOMPANHANTES', bold: true, fontSize: 9, margin: [0, 4, 0, 0], alignment: 'center' },
            { text: 'CRIANÇAS', bold: true, fontSize: 9, margin: [0, 4, 0, 0], alignment: 'center' },
            { text: 'CAN FREE', bold: true, fontSize: 9, margin: [0, 4, 0, 0], alignment: 'center' },
            { text: 'ENTRADA', bold: true, fontSize: 9, margin: [0, 4, 0, 0], alignment: 'center' },
            { text: 'SAIDA', bold: true, fontSize: 9, margin: [0, 4, 0, 0], alignment: 'center' },
            { text: 'ATIVO', bold: true, fontSize: 9, margin: [0, 4, 0, 0], alignment: 'center' },
        ];
        const body = this.dadosParaImpressao.map((item) => {
            let data_ini = new Date(item.checkin)
            let data_fim = new Date(item.checkout)
            return [
                { text: item.id_reserva, fontSize: 8, alignment: 'center' },
                { text: item.hospede.usuario.nome, fontSize: 8, alignment: 'center' },
                { text: item.hospede.usuario.telefone, fontSize: 8, alignment: 'center' },
                { text: item.hospede.usuario.email, fontSize: 8, alignment: 'center' },
                { text: item.hospede.usuario.cidade, fontSize: 8, alignment: 'center' },
                { text: item.acomodacao, fontSize: 8, alignment: 'center' },
                { text: item.qte_pessoa_mais, fontSize: 8, alignment: 'center' },
                { text: item.qte_pessoa_menos, fontSize: 8, alignment: 'center' },
                { text: item.canc_free, fontSize: 8, alignment: 'center' },
                { text: data_ini.toLocaleDateString(), fontSize: 8, alignment: 'center' },
                { text: item.checkout ? data_fim.toLocaleDateString() : "", fontSize: 8, alignment: 'center' },
                { text: item.ativo === "NULL" ? "Não" : "Sim", fontSize: 8, alignment: 'center' },
            ]
        });

        const lineHeader = [
            {
                text: '________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________',
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
            pageMargins: [25, 45, 14, 48],
            header: function () {
                return {
                    margin: [14, 12, 14, 0],
                    layout: 'noBorders',
                    table: {
                        widths: ['*'],
                        body: [
                            [
                                { text: 'RELATÓRIO DE RESERVAS - PERIODO', style: 'reportName' }
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
                        widths: [10, 120, 50, 120, 40, 50, 80, 50, 50, 45, 45, 30],

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