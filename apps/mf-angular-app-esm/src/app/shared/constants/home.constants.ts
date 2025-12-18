import { HomeCard, NavItem } from "@interfaces/home.interface";

export const homeCard: HomeCard[] = [
    {
      title: "Seguro Garantia",
      description: "Proteja sua empresa contra prejuízos causados pelo descumprimento de obrigações contratuais.",
      image: "svg/Contratos.svg",
    },
    {
      title: "Seguro Patrimonial",
      description: "Garanta a cobertura contra danos e perdas que possam afetar sua empresa.",
      image: "svg/predio.svg",
    },
    {
      title: "Risco de Engenharia",
      description: "Fortaleça a segurança do seu projeto contra imprevistos.",
      image: "svg/engenharia.svg",
    },
    {
      title: "Riscos Diversos",
      description: "Protegemos proprietários e locatários de máquinas e equipamentos, garantindo segurança e continuidade às operações em diversos setores.",
      image: "svg/combustível.svg",
    },
  ];

export const navItems: NavItem[] = [
  { icon: 'svg/menú.svg', label: 'Home', route: '/home' },
  { 
    icon: 'svg/productos.svg', 
    label: 'Conheça os produtos',
    submenu: [
      { label: 'Garantia', route: '/produtos/garantia' },
      { label: 'Seguro Patrimonial', route: '/produtos/seguro-patrimonial' },
      { label: 'Riscos de Engenharia', route: '/produtos/riscos-engenharia' },
      { label: 'Riscos Diversos', route: '/produtos/riscos-diversos' }
    ],
    route: '/produtos'
  },
  { icon: 'svg/nueva-cotizacion.svg', label: 'Nova cotação', route: '/nova-cotacao' },
  { icon: 'svg/endoso.svg', label: 'Novo endosso', route: '/novo-endoso' },
  { icon: 'svg/cotizacion-propuestas.svg', label: 'Minhas cotações e propostas', route: '/cotacoes-propostas' },
  { icon: 'svg/polizas-endosos.svg', label: 'Minhas apólices e endossos', route: '/apolices-endossos' },
  { icon: 'svg/tomadores.svg', label: 'Gestão de tomadores', route: '/tomadores' },
  { icon: 'svg/gestion-financiera.svg', label: 'Gestão financeira', route: '/financeira' },
  { icon: 'svg/siniestros.svg', label: 'Sinistros', route: '/sinistros' }
];