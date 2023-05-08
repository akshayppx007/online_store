class APIFeatures {
	constructor(query, queryStr) {
		this.query = query;
		this.queryStr = queryStr;
	}

	filterProducts() {
		let queryCopy = {};
		let priceQueryCondition = {};
		let ratingQueryCondition = {};
		let queryCondition = false;
		if (this.queryStr.price) {
			queryCondition = true;
			priceQueryCondition = { price: { $lte: Number(this.queryStr.price) } };
		}

		if (this.queryStr.rating) {
			queryCondition = true;
			ratingQueryCondition = {
				rating: { $in: this.queryStr.rating.split(",") },
			};
		}

		if (queryCondition) {
			queryCopy = { $and: [priceQueryCondition, ratingQueryCondition] };
		}
		this.query = this.query.find(queryCopy);
		return this;
	}

	sortProducts() {
		let sort = {};

		const sortOption = this.queryStr.sort || "";

		if (sortOption) {
			let sortOpt = sortOption.split("_");
			sort = { [sortOpt[0]]: Number(sortOpt[1]) };
			this.query = this.query.sort(sort);
			return this;
		}
	}

	pagination(recordsPerPage) {
		const currentPage = Number(this.queryStr.currentPage) || 1;
		const pageSkip = recordsPerPage * (currentPage - 1);

		this.query = this.query.skip(pageSkip).limit(recordsPerPage);

		return this;
	}
}

module.exports = APIFeatures;
