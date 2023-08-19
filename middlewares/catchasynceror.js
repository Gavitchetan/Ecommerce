const InternalErorohandeler = () => (req, res, next) => {
    Promise.resolve(InternalErorohandeler(req, res, next)).catch(next)
};

export default InternalErorohandeler;
