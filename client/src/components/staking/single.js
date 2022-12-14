import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Grid, Button, Modal, FormControl, OutlinedInput, InputLabel, InputAdornment, Stack } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { indigo, blueGrey, grey } from '@mui/material/colors';
import { useSelector } from "react-redux";

const theme = createTheme({
	palette: {
		info: {
			main: grey[600],
			contrastText: '#fff',
		},
		primary: {
			light: indigo[200],
			main: indigo[400],
			darker: indigo[800],
			contrastText: '#fff'
		},
	},
});

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

const cardStyle = {
	width: '100%',
	border: '2px',
	boxShadow: 24,
	p: 2,
	textAlign: 'center'
};

const Caver = require('caver-js');
const caver = new Caver(window.klaytn);

const bankabi = require('../../contract/ABI/lending/Bank.json');

const PlatformTokenAddress = '0xf2d5a9b9E7eC682aF9f353c6715DDf6b6393EE34';
const bankAddress = '0x91ee8a1860408fFBA594Cab5a5c34619ABb59640';

const BankContract = new caver.klay.Contract(bankabi, bankAddress);

function Single() {
	const [depo, setDeposit] = useState(false);
	const [widr, setWithdraw] = useState(false);

	const [lend, setLend] = useState(false);
	const [repay, setRepay] = useState(false);

	const [totalstaked, setTotalstaked] = useState('');

	const [mystaked, setMystaked] = useState('');

	const [myrepay, setmyRepay] = useState('');

	const depositShow = () => setDeposit(true);
	const depositClose = () => setDeposit(false);

	const withdrawShow = () => setWithdraw(true);
	const withdrawClose = () => setWithdraw(false);

	const lendShow = () => setLend(true);
	const lendClose = () => setLend(false);

	const repayShow = () => setRepay(true);
	const repayClose = () => setRepay(false);

	const address = useSelector((state) => state.counter);

	const [amount, setAmount] = useState("");
	const [Ybal, setYbal] = useState("0");

	const handleInput2 = (e) => { setAmount(e.target.value) };

	const TotalStaked = async () => {
		const kip7 = new caver.klay.KIP7(PlatformTokenAddress);
		const bal = await kip7.balanceOf(bankAddress);
		setTotalstaked(caver.utils.fromPeb(bal));
	}

	const YDEXbalance = async () => {
		const YDEXkip7 = new caver.klay.KIP7(PlatformTokenAddress);
		const Ybal = await YDEXkip7.balanceOf(address.number);
		setYbal(caver.utils.fromPeb(Ybal))
	}

	const handleDeposit = async () => {

		const kip7 = new caver.klay.KIP7(PlatformTokenAddress);

		const allowed = await kip7.allowance(address.number, bankAddress);
		if (allowed.toString() === "0") {
			try {
				await kip7.approve(bankAddress, '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', {
					from: address.number,
				});
			} catch (err) {
				console.log(err);
			}
		}
		await BankContract.methods.deposit(PlatformTokenAddress, caver.utils.toPeb(amount))
			.send({ from: address.number, gas: 200000000 });
		setDeposit(false)
	};

	const handleWithdraw = async () => {
		await BankContract.methods.withdraw(PlatformTokenAddress, caver.utils.toPeb(amount))
			.send({ from: address.number, gas: 200000000 });
		setWithdraw(false);
	};
	useEffect(() => {
		TotalStaked();
		RepayAmount();
		YDEXbalance();
	}, [totalstaked, myrepay]);

	const handleBorrow = async () => {
		await BankContract.methods.borrow('0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', caver.utils.toPeb(amount))
			.send({ from: address.number, gas: 200000000 });
		setLend(false);
	}

	const handleRepay = async () => {
		await BankContract.methods.repay('0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', caver.utils.toPeb(amount))
			.send({ from: address.number, gas: 200000000, value: caver.utils.toPeb(amount) });
		setRepay(false);
	}

	const RepayAmount = async () => {
		const repay = await BankContract.methods.repayKlayAmount().call({ from: address.number });
		setmyRepay(caver.utils.fromPeb(repay));
	}



	return (
		<div className="Pool">
			<div className="pageInfo">
				<h2>Single Pool List</h2>
				<p>KLAY??? KIP7 ????????? <b>?????? ???</b> ????????? ????????????, <br /> ????????? ?????? <b>??????</b> ??? <b>??????</b> ??? ??? ????????????.</p>
			</div>
			<br />
			<br />
			<ThemeProvider theme={theme}>
				<Stack spacing={1}>
					<Card
						key={'Secondary'}
						sx={cardStyle}
					>
						<CardContent>
							<Grid container>
								<Grid xs={3}>
									<Typography gutterBottom variant="h6">[ KIP7 Token ]</Typography>
									<Typography gutterBottom variant="h5">YDEXToken</Typography>
								</Grid>
								<Grid xs={5}>
									<Stack>
										<Typography variant="body2" color="text.secondary">??? ????????????</Typography>
										<br />
										<Typography variant="h5" component="h6">{totalstaked} YDEXT</Typography>
									</Stack>
								</Grid>
								<Grid xs={4}>
									<Stack direction="row" spacing={1} sx={{ p: 0.5 }}>
										<Button fullWidth variant="contained" onClick={depositShow} >Deposit</Button>
										<Modal
											open={depo}
											onClose={depositClose}
											backdrop="static"
											keyboard={false}
										>
											<Box sx={style}>
												<Typography id="modal-modal-title" variant="h6" component="h2">YDEXToken Deposit</Typography>
												<Typography id="modal-modal-description" sx={{ mt: 2 }}>
													<div>
														<h5>??? ?????? ??????</h5>
														<strong>{mystaked}</strong>
														<span>YDEXToken</span>
														<br />
														<br />
														<h5>?????? ????????? ??????</h5>
														<strong>{Number(Ybal).toFixed(2)}</strong>
														<span> YDEXToken</span>
														<br />
														<br />
													</div>
													<Box
														component="form"
														sx={{
															'& > :not(style)': { width: 500, maxWidth: '100%' },
														}}
														noValidate
														autoComplete="off">
														{/* Deposit Input  */}
														{/* ?????? ??????, ??????, ?????? ??????  */}
														<InputLabel component="h5">YDEXToken</InputLabel>
														<FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
															<OutlinedInput fullWidth
																margin="dense"
																type="text"
																placeholder="????????? ?????? ??????"
																autoFocus
																aria-label="Default"
																endAdornment={<InputAdornment position="end">YDEX</InputAdornment>}
																aria-describedby="outlined-weight-helper-text"
																onChange={(e) => handleInput2(e)}
															/>
														</FormControl>
													</Box>
												</Typography>
												<br />
												<Stack direction="row" justifyContent="flex-end" spacing={2}>
													<Button variant="outlined" onClick={depositClose}>
														??????
													</Button>
													<Button type="submit" variant="outlined" onClick={handleDeposit}>??????</Button>
												</Stack>
											</Box>
										</Modal>

										<Button fullWidth variant="outlined" onClick={withdrawShow}>Withdraw</Button>
										<Modal
											open={widr}
											onClose={withdrawClose}
											backdrop="static"
											keyboard={false}
										>
											<Box sx={style}>
												{/* ????????? ????????? ??? ????????? ?????? */}
												<Typography id="modal-modal-title" variant="h6" component="h2">YDEXToken Withdraw</Typography>
												<Typography id="modal-modal-description" sx={{ mt: 2 }}>
													<div>
														<h5>??? ?????? ??????</h5>
														<strong>{mystaked}</strong>
														<span>YDEXT</span>
														<br />
														<br />
														<h5>??? ??????</h5>
														<strong>{totalstaked}</strong>
														<span> YDEXToken</span>
														<br />
														<br />
													</div>
													<Box
														component="form"
														sx={{
															'& > :not(style)': { width: 500, maxWidth: '100%' },
														}}
														noValidate
														autoComplete="off">
														{/* Withdraw Input  */}
														<InputLabel component="h5">YDEXToken</InputLabel>
														<FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
															<OutlinedInput fullWidth
																margin="dense"
																type="text"
																placeholder="????????? ?????? ??????"
																autoFocus
																aria-label="Default"
																endAdornment={<InputAdornment position="end">YDEX</InputAdornment>}
																aria-describedby="outlined-weight-helper-text"
																onChange={(e) => handleInput2(e)}
															/>
														</FormControl>
													</Box>
												</Typography>
												<br />
												<Stack direction="row" justifyContent="flex-end" spacing={2}>
													<Button variant="outlined" onClick={withdrawClose}>
														??????
													</Button>
													<Button type="submit" variant="outlined" onClick={handleWithdraw}>??????</Button>
												</Stack>
											</Box>
										</Modal>
									</Stack>

									{/* ??????!!!!! */}
									<Stack direction="row" spacing={1} sx={{ p: 0.5 }}>
										<Button fullWidth variant="contained" onClick={lendShow} >Borrow</Button>
										<Modal
											open={lend}
											onClose={lendClose}
											backdrop="static"
											keyboard={false}
										>
											<Box sx={style}>
												<Typography id="modal-modal-title" variant="h6" component="h2">KLAY Borrow</Typography>
												<Typography id="modal-modal-description" sx={{ mt: 2 }}>
													<div>
														<strong>YDEXT??? ??????????????? ?????? KLAY??? Borrow??? ??? ????????????.</strong>
														<br />
														<br />
													</div>
													<Box
														component="form"
														sx={{
															'& > :not(style)': { width: 500, maxWidth: '100%' },
														}}
														noValidate
														autoComplete="off">
														{/* Lending Input  */}
														<InputLabel component="h5">?????? ?????? : ????????? YDEXT ????????? 150%</InputLabel>
														<FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
															<OutlinedInput fullWidth
																margin="dense"
																type="text"
																placeholder="????????? ?????? ??????"
																autoFocus
																aria-label="Default"
																endAdornment={<InputAdornment position="end">KLAY</InputAdornment>}
																aria-describedby="outlined-weight-helper-text"
																onChange={(e) => handleInput2(e)}
															/>
														</FormControl>
													</Box>
												</Typography>
												<br />
												<Stack direction="row" justifyContent="flex-end" spacing={2}>
													<Button variant="outlined" onClick={lendClose}>
														??????
													</Button>
													<Button type="submit" variant="outlined" onClick={handleBorrow}>??????</Button>
												</Stack>
											</Box>
										</Modal>

										<Button fullWidth variant="outlined" onClick={repayShow}>Repay</Button>
										<Modal
											open={repay}
											onClose={repayClose}
											backdrop="static"
											keyboard={false}
										>
											<Box sx={style}>
												{/* ????????? ????????? ??? ????????? ?????? */}
												<Typography id="modal-modal-title" variant="h6" component="h2">KLAY Repay</Typography>
												<Typography id="modal-modal-description" sx={{ mt: 2 }}>
													<div>
														<h5>??? ?????? ??????</h5>
														<strong>{myrepay}</strong>
														<span>KLAY</span>

													</div>
													<Box
														component="form"
														sx={{
															'& > :not(style)': { width: 500, maxWidth: '100%' },
														}}
														noValidate
														autoComplete="off">
														{/* Repay Input  */}
														<InputLabel component="h5">KLAY</InputLabel>
														<FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
															<OutlinedInput fullWidth
																margin="dense"
																type="text"
																placeholder="????????? ?????? ??????"
																autoFocus
																aria-label="Default"
																endAdornment={<InputAdornment position="end">KLAY</InputAdornment>}
																aria-describedby="outlined-weight-helper-text"
																onChange={(e) => handleInput2(e)}
															/>
														</FormControl>
													</Box>
												</Typography>
												<br />
												<Stack direction="row" justifyContent="flex-end" spacing={2}>
													<Button variant="outlined" onClick={repayClose}>
														??????
													</Button>
													<Button type="submit" variant="outlined" onClick={handleRepay}>??????</Button>
												</Stack>
											</Box>
										</Modal>
									</Stack>

								</Grid>
							</Grid>
						</CardContent>
					</Card>
				</Stack>

			</ThemeProvider>

		</div>


	);
}

export default Single;