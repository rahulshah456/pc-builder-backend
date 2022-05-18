const express = require("express");
const { componentRoutesMapping } = require("../const/constants");
const { rigComponentIds, getComponentsById } = require("../services/componentService");

let router = express.Router();

router.route('/:componentId')
    .get(async (req, res, next) => {
        const componentId = req.params.componentId;
        if (!rigComponentIds.includes(componentId)) {
            res.status(404).send(`No data available for ${componentId}.`);
        }

        getComponentsById(componentRoutesMapping.get(componentId))
            .then(data => {
                res.status(200).send(data);
            }).catch(error => {
                res.status(500).send(error);
            });
    });

module.exports = router;