import { GarantiaConstants } from "@interfaces/home.interface";

export const GARANTIA_CONSTANTS: GarantiaConstants = {
    title: 'Seguro Garantia',
    description: 'O Seguro Garantia ajuda sua empresa a cumprir obrigações contratuais ou legais, atendendo tanto instituições públicas quanto privadas, protegendo contra riscos financeiros e trazendo mais previsibilidade para os negócios.',
    cards:{
        title:'Nossas principais modalidades',
        items:[
            {
                icon:'icons/grid.svg',
                title:'Garantia Tradicional',
                description:'Proteção para obras de construção, reformas e manutenções, garantindo a qualidade e a conformidade com as especificações contratuais.',
                buttonLabel:'Cotar agora',
            },
            {
                icon:'icons/grid.svg',
                title:'Garantia Judicial',
                description:'Preserve os recursos, otimize custos e aprimore o fluxo de caixa da sua empresa em processos judiciais.',
                buttonLabel:'Cotar agora',
            },
            {
                icon:'icons/grid.svg',
                title:'Garantia Imobiliário',
                description:'Garante a conclusão de obras residenciais e comerciais vendidas na planta ou em permuta de terreno.',
                buttonLabel:'Cotar agora',
            },
            {
                icon:'icons/grid.svg',
                title:'Garantia Habitacional',
                description:'Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod. ',
                buttonLabel:'Cotar agora',
            },
        ]
    },
    modalities:{
        title:'Conheça todas as modalidades',
        columnA:{
            title:'Setor público',
            items:[
                {
                    title:'Aduaneira',
                },
                {
                    title:'Loteamento',
                },
                {
                    title:'Concessão',
                },
                {
                    title:'Licitante',
                },
                {
                    title:'Performance',
                },
                {
                    title:'Manutenção corretiva',
                },
                {
                    title:'Minha casa verde e amarela',
                },
                {
                    title:'Judicial',
                },
            ]
        },
        columnB:{
            title:'Setor privado',
            items:[
                {
                    title:'Adiantamento',
                },
                {
                    title:'Licitante',
                },
                {
                    title:'Performance',
                },
                {
                    title:'Manutenção corretiva',
                },
                {
                    title:'Imobiliário',
                },
                {
                    title:'Pagamento',
                },
                {
                    title:'Financeira',
                },
                {
                    title:'Fast claim',
                },
                {
                    title:'Garantia imediata',
                },
                {
                    title:'Gestiona',
                },
                {
                    title:'Antecipação',
                },
                {
                    title:'Escrow',
                }
            ]
        }
    },
    requirements:{
        title:'Quem precisa contratar uma apólice?',
        items:[
            {
                title:'Empresas que participam de licitações',
                description:'Atendendo às exigências contratuais para garantir a seriedade da proposta. ',
            },
            {
                title:'Empresas prestadoras de serviços',
                description:'Assegurando a execução de contratos de serviços em diversos setores. ',
            },
            {
                title:'Fornecedores de bens',
                description:'Garantindo a entrega de produtos conforme as condições acordadas. ',
            },
            {
                title:'Construtoras e incorporadoras',
                description:'Protegendo projetos de construção e infraestrutura.',
            },
            {
                title:'Indústrias e fabricantes',
                description:'Viabilizando contratos de fornecimento e distribuição.',
            }
        ]
    },
    image: 'svg/garantia-broker-image.svg',
}

export const PANDC_PATRIMONIAL: GarantiaConstants = {
    title: 'Seguro Patrimonial',
    acotar: 'Cotar agora',
    description: 'Com o Seguro Patrimonial, sua empresa fica protegida contra uma variedade de riscos que podem causar danos e perdas, permitindo que você continue suas operações com segurança e tranquilidade focando no que importa: crescer',
    faqs:{
        cards:[
            {
                title:'Como funciona?',
                description:'A apólice oferece coberturas personalizáveis que protegem seus bens e ativos empresariais, garantindo assistência imediata em caso de sinistro, com todo o suporte necessário para resolver a situação rapidamente.',
            },
            {
                title:'Quais são os benefícios da apólice?',
                description:'Cobertura contra incêndios, tempestades, alagamentos e terremotos, proteção contra roubo de bens e danos causados por falhas elétrica e muito mais. Minimize o impacto financeiro e permita que sua empresa se recupere.'
            }
        ]
    },
    requirements:{
        title:'Quem precisa contratar uma apólice?',
        items:[
            {
                title:'Indústrias',
                description:'Empresas que possuem fábricas ou instalações com maquinário e equipamentos valiosos, protegendo-os contra danos ou perdas.',
            },
            {
                title:'Comércio e varejo',
                description:'Negócios que operam com estoques de produtos e precisam de proteção contra riscos como incêndios ou roubos.',
            },
            {
                title:'Escritórios e consultorias',
                description:'Negócios que possuem estruturas físicas e dependem da segurança de seus imóveis e documentos.',
            },
            {
                title:'Empresas de tecnologia',
                description:'Empresas que armazenam ou comercializam produtos tecnológicos, protegendo seus equipamentos e inventários.',
            }
        ]
    },
    image: 'svg/pandc-patrimonial.svg',
}

export const RISCOS_ENGENHARIA: GarantiaConstants = {
    title: 'Riscos de Engenharia',
    acotar: 'Cotar agora',
    description: 'O Seguro Engenharia oferece cobertura para riscos associados a projetos de construção, instalação e montagem. Com essa proteção, sua empresa evita prejuízos e mantém a continuidade da obra, garantindo segurança financeira para todos os envolvidos.',
    faqs:{
        cards:[
            {
                title:'Como funciona?',
                description:'A apólice cobre danos ao projeto durante a execução da obra, com opções de coberturas adicionais para atender às necessidades específicas de cada empreendimento. Em caso de sinistro, o suporte é ágil para minimizar impactos e garantir a retomada das atividades.',
            },
            {
                title:'Quais são os benefícios da apólice?',
                description:'Proteção contra danos à estrutura, equipamentos e materiais durante a fase de construção, cobertura para prejuízos causados a propriedades ou pessoas externas pela obra e apólice simplificada, com subscrição fácil, garantindo contratação eficiente.'
            }
        ]
    },
    requirements:{
        title:'Quem precisa contratar uma apólice?',
        items:[
            {
                title:'Construção civil',
                description:'Empresas responsáveis por obras de construção vertical e horizontal, que necessitam de cobertura contra riscos específicos durante a execução dos projetos.',
            },
            {
                title:'Infraestrutura',
                description:'Empresas que realizam projetos de infraestrutura, como rodovias, pontes ou saneamento, protegendo-se contra danos materiais e riscos a terceiros.',
            },
            {
                title:'Instalações industriais',
                description:'Empresas que instalam maquinários ou equipamentos em fábricas, protegendo esses ativos e prevenindo prejuízos causados por acidentes ou falhas no processo de instalação.',
            },
            {
                title:'Empreiteiras e construtoras',
                description:'Empresas especializadas na execução de obras de grande porte, que enfrentam riscos variados, desde danos a estruturas até responsabilidades com terceiros envolvidos no projeto.',
            }
        ]
    },
    image: 'svg/riscos-engenharia.svg',
}

export const RISCOS_DIVERSOS: GarantiaConstants = {
    title: 'Riscos de diversos',
    acotar: 'Cotar agora',
    description: 'Nosso seguro foi criado para proprietários e locatários de máquinas e equipamentos que atuam no agronegócio, na indústria, no comércio, na construção e na prestação de serviços, garantindo tranquilidade, segurança e continuidade nas suas operações.',
    faqs:{
        cards:[
            {
                title:'Como funciona?',
                description:'O seguro Riscos Diversos protege máquinas e equipamentos contra perdas e danos causados por acidentes externos, com coberturas que incluem roubo, furto, alagamento e quebra. Atuamos em 3 segmentos atualmente: Avla Equipamentos, Avla Benfeitorias e Avla Penhor Rural',
            },
            {
                title:'Quais são os benefícios da apólice?',
                description:'O seguro oferece proteção completa contra imprevistos, como roubo, furto e danos acidentais, além de cobertura para falhas elétricas e riscos em ambientes com proximidade de água. Também garante segurança nas operações, com responsabilidade civil para terceiros e proteção extra para os operadores de máquinas.'
            }
        ]
    },
    requirements:{
        title:'Quem precisa contratar uma apólice?',
        items:[
            {
                title:'Agronegócio',
                description:'Protege equipamentos e maquinário agrícola contra diversos riscos, como roubo, incêndio, acidentes durante transporte ou operação, danos elétricos e outros.',
            },
            {
                title:'Indústria e comércio',
                description:'É útil para a indústria e comércio ao proteger equipamentos contra danos acidentais (como incêndio, roubo e alagamento), garantindo a continuidade das operações e evitando perdas financeiras significativas',
            },
            {
                title:'Construção e prestação de serviços',
                description:'Proprietários e locatários de máquinas e equipamentos que operam em em variadas atividades.',
            }
        ]
    },
    image: 'svg/riscos-diversos.svg',
}