const VirtualShelf = require('../models/VirtualShelf');
const Book = require('../models/Book');

const router = require("express").Router();

router.route('/')
    .get(async (req, res) => {
        try {
            const virtualShelves = await VirtualShelf.findAll();
            return res.status(200).json(virtualShelves);
        } 
        catch (err) {
            return res.status(500).json(err);
        }
    })
    .post(async (req, res) => {
        try {
            const newVirtualShelf = await VirtualShelf.create(req.body);
            return res.status(200).json(newVirtualShelf);
        } catch (err) {
            return res.status(500).json(err);
        }
    })

    router.route('/sortare')
    .get(async (req, res) => {
        const virtualShelves = await VirtualShelf.findAll();
        
        if(virtualShelves){
          return res.status(200).json(virtualShelves.sort((a, b) => a.dataVS - b.dataVS));
        }
            

        else{
            return res.status(500).json("nu exista entitati");

        }
    })

    router.route('/filter')
    .get(async (req, res) => {
        const virtualShelves = await VirtualShelf.findAll();
        let filteredVirtualShelves;
        if(req.query.dataVS && req.query.descriereVS){
            filteredVirtualShelves =  virtualShelves.filter(x => (x.dataVS >= req.query.dataVS || x.descriereVS.includes(req.query.descriereVS)));
            return res.status(200).json(filteredVirtualShelves);

        }else{
            return res.status(500).json("Not found");

        }
    })

    router.route('/:id')
    .get(async (req, res) => {
        try {
            const virtualShelf = await VirtualShelf.findByPk(req.params.id);
            if (virtualShelf) {
                return res.status(200).json(virtualShelf);
            } else {
                return res.status(404).json({ error: `nu a fost gasit id = ${req.params.id}` });
            }
        }
        catch (err) {
            return res.status(500).json(err);
        }
    })
    .put(async (req, res) => {
        try {
            
            const virtualShelf = await VirtualShelf.findByPk(req.params.id);
            if (virtualShelf) {
                const updateVirtualShelf = await virtualShelf.update(req.body);
                return res.status(200).json(updateVirtualShelf);
            } else {
                return res.status(404).json({ error: `nu a fost gasit id = ${req.params.id}` });
            }

        }
        catch (err) {
            return res.status(500).json(err);
        }
    })
    .delete(async (req, res) => {
        const id = req.params.id;
    
        VirtualShelf.destroy({
            where: { idVirtualShelf: id }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: `VirtualShelf-ul cu id=${id} a fost stearsa!`
                    });
                } else {
                    res.send({
                        message: `Cannot delete VirtualShelf with id=${id}. Maybe VirtualShelf was not found!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Could not delete VirtualShelf with id=" + id
                });
            })
       
    })
  
    
    module.exports = router;


