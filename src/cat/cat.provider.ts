const DevelopmentCatService = {
	findAll: () => `This action returns all cats from dev service `,
};

const ProductionCatService = {
	findAll: () => {
		console.log(process.env.NODE_ENV);
		return `This action returns all cats from production service `;
	},
};

export enum CatType {
	Dev = 'black',
	product = 'white',
}

const createCatDynamicProvider = {
	provide:
		process.env.NODE_ENV === 'development' ? CatType.Dev : CatType.product,
	useValue:
		process.env.NODE_ENV === 'development'
			? DevelopmentCatService
			: ProductionCatService,
};

export default createCatDynamicProvider;
