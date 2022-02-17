const { loggerBroker } = require('../../config/logger');
const toolsLib = require('hollaex-tools-lib');

function createBrokerPair(req, res) {
	loggerAdmin.verbose(
		req.uuid,
		'controllers/broker/createBrokerPair auth',
		req.auth
	);

	const {
		symbol,
		buy_price,
		sell_price,
		paused,
		user_id,
		min_size,
		max_size,
		increment_size
	} = req.swagger.params.data.value;

	toolsLib.broker.createBrokerPair({
		symbol,
		buy_price,
		sell_price,
		paused,
		user_id,
		min_size,
		max_size,
		increment_size,
	})
		.then((data) => {
			return res.json(data);
		})
		.catch((err) => {
			loggerAdmin.error(
				req.uuid,
				'controllers/broker/createBrokerPair err',
				err.message
			);
			return res.status(err.statusCode || 400).json({ message: errorMessageConverter(err) });
		});
}

function updateBrokerPair(req, res) {
	loggerAdmin.verbose(
		req.uuid,
		'controllers/broker/updateBrokerPair auth',
		req.auth
	);

	toolsLib.broker.updateBrokerPair(req.swagger.params.data.value)
		.then((data) => {
			return res.json(data);
		})
		.catch((err) => {
			loggerAdmin.error(
				req.uuid,
				'controllers/broker/updateBrokerPair err',
				err.message
			);
			return res.status(err.statusCode || 400).json({ message: errorMessageConverter(err) });
		});
}

function deleteBrokerPair(req, res) {
	loggerAdmin.verbose(
		req.uuid,
		'controllers/broker/deleteBrokerPair auth',
		req.auth
	);

	toolsLib.broker.deleteBrokerPair(req.swagger.params.data.value.id)
		.then((data) => {
			return res.json({ message: "Successfully deleted broker pair." });
		})
		.catch((err) => {
			loggerAdmin.error(
				req.uuid,
				'controllers/broker/updateBrokerPair err',
				err.message
			);
			return res.status(err.statusCode || 400).json({ message: errorMessageConverter(err) });
		});
}

function getBrokerPairs(req, res) {
	loggerAdmin.verbose(
		req.uuid,
		'controllers/broker/deleteBrokerPair auth',
		req.auth
	);

	toolsLib.broker.fetchBrokerPairs([
		'symbol',
		'buy_price',
		'sell_price',
		'paused',
		'min_size',
		'max_size',
		'increment_size'
	])
		.then((brokerPairs) => {
			return res.json(brokerPairs);
		})
		.catch((err) => {
			loggerAdmin.error(
				req.uuid,
				'controllers/broker/getBrokerDeals err',
				err.message
			);
			return res.status(err.statusCode || 400).json({ message: errorMessageConverter(err) });
		});

}

function executeBrokerDeal(req, res) {
	loggerAdmin.verbose(
		req.uuid,
		'controllers/broker/executeBrokerDeal auth',
		req.auth
	);

	const {
		side
		symbol,
		price,
		size,
	} = req.swagger.params.data.value;

	const userId = req.auth.sub.id;

	executeBrokerDeal(userId, symbol, side, size, price)
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			loggerAdmin.error(
				req.uuid,
				'controllers/broker/executeBrokerDeal err',
				err.message
			);
			return res.status(err.statusCode || 400).json({ message: errorMessageConverter(err) });
		});
}

module.exports = {
	createBrokerPair,
	updateBrokerPair,
	deleteBrokerPair,
	getBrokerPairs,
	executeBrokerDeal
};