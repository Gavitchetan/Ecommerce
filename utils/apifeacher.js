class Apifeacherswithwihtserchfilter {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }
    Searches() {
        const serchTrough_keywoard = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i",
            }
        } : {}
        this.query = this.query.find({ ...serchTrough_keywoard })
        return this;
    }
    filter() {
        const queryCopy = { ...this.queryStr }

        const reomvefilds = ['keyword', 'page', 'limit']
        reomvefilds.forEach((key) => delete queryCopy[key])
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`)
        this.query = this.query.find(JSON.parse(queryStr))
        return this;
    }
    Filter() {
        const queryCopy = { ...this.queryStr }
        let removkeyword = ['keyword', 'page', 'limit'];
        removkeyword.forEach((key) => delete queryCopy[key]);
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace()

    }

    // pagination(resultPerPage) {
    //     const currentPage = Number(this.queryStr.page) || 1;
    //     const skip = resultPerPage * (currentPage - 1);
    //     this.query = this.query.limit(resultPerPage).skip(skip);
    //     return this;
    // }


    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;

        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }
}


export const ENV = process.env;
export default Apifeacherswithwihtserchfilter
