
const getPlantData = (req, res, db) => {
    db.select('*').from('plantstable')
      .then(items => {
        if(items.length){
          res.json(items)
        } else {
          res.json({dataExists: 'false'})
        }
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }
  
  const postPlantData = (req, res, db) => {
    const { name, days } = req.body
    const added = new Date()
    db('plantstable').insert({name, days, added})
      .returning('*')
      .then(item => {
        res.json(item)
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }
  
  const deletePlantData = (req, res, db) => {
    const { id } = req.body
    db('plantstable').where({id}).del()
      .then(() => {
        res.json({delete: 'true'})
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }
  
  module.exports = {
    getPlantData,
    postPlantData,
    deletePlantData
  }
