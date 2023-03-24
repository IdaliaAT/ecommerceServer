import { State } from '../../models/index.js'

const getAllState = async (req, res) => {
  try {
    const { countryId } = req.params
    const states = await State.findAll({ where: { countryId } })
    states.length === 0
      ? res.status(400).send({
        message: 'No states found',
        success: false
      })
      : res.status(200).send({
        message: 'Get all states',
        success: true,
        states
      })
  } catch (error) {
    res.status(400).send({ message: error, success: false })
  }
}

const getStateById = async (req, res) => {
  try {
    const { stateId } = req.params
    const data = await State.findByPk(stateId)
    data.length === 0
      ? res.status(400).send({
        message: 'No states found',
        success: false
      })
      : res.status(200).send({
        message: 'Get all states',
        success: true,
        data
      })
  } catch (error) {
    res.status(400).send({ message: error, success: false })
  }
}

export {
  getAllState,
  getStateById
}
