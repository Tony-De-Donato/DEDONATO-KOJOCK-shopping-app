const data = require('../data2.json');

exports.getKits = (req, res) => {
    const id = parseInt(req.params.id);
    const kits = data.kits;

    res.json(kits)

};

exports.getKit = async (req, res) => {
    const id = parseInt(req.params.id);
    const kits = data.kits;
    const kit = kits.find(s => s.id == id);

    if (!kit) {
        res.status(404).send({message : 'kit not found'});
    } else {
        res.status(200).json({
            message : 'kit found succesfully',
            kit
        });
    }
};