import { filter } from 'lodash';
import { connect } from 'react-redux';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  IconButton,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
import ContractDetailModal from '../components/ContractDetailModal';
import { ContractCount, ContractList, PayContract } from '../hooks/useContractMethod';
import { GetUserById } from '../hooks/useUserHandler';
import { TransactionCount, TransactionList } from '../hooks/useTransactionMethod';
import { ProposalCount, ProposalList } from '../hooks/useProposalMethod';
import { ContractStatus } from '../utils/constants/contract.constants';
import { Roles } from '../utils/constants/role.constants';

// mock
import INVOICELIST from '../_mock/invoice';
// import contracts from '../_mock/contract';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

const RED_STATUS = [ContractStatus.REJECTED, ContractStatus.PENDING];
const GREEN_STATUS = [ContractStatus.ACCEPTED, ContractStatus.ACTIVE, ContractStatus.COMPLETED];

const BLUE_STATUS = [
  ContractStatus.WAITING_CONTRACTOR_RESPONSE,
  ContractStatus.WAITING_EMPLOYER_RESPONSE,
  ContractStatus.TERMINATED_BY_BOTH_PARTIES,
];
function Contracts(props) {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [toggleModal, setToggleModal] = useState(false);

  const [rowSelected, setRowSelected] = useState(null);

  const [contracts, setContratcs] = useState([]);

  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    async function fetchContracts() {
      try {
        const response = await getContracts();
        console.log("LOG : fetchContracts -> response", response)
        setContratcs(response);
      } catch (e) {
        console.error(e);
      }
    }
    async function fetchProposals() {
      try {
        const response = await getProposals();
        console.log("LOG : fetchProposals -> response", response)
        setProposals(response);
      } catch (e) {
        console.error(e);
      }
    }
    fetchProposals();
    fetchContracts();
  }, []);

  const getContracts = async (account) => {
    const contractCount = await ContractCount(props.user.web3);
    return await ContractList(contractCount, props.user.web3);
  };

  const getProposals = async () => {
    const proposalCount = await ProposalCount(props.user.web3);
    return await ProposalList(proposalCount, props.user.web3);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = contracts.map((n) => n.contract_type);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const matchProposalsWithContracts = (contracts, proposals) => {
    contracts.map((contract) => {
      for (const index in proposals) {
        if (contract.proposal_id == proposals[index].proposal_id) {
          contract.contract_type = proposals[index].contract_type;
          contract.payment_rate = proposals[index].payment_rate;
          contract.payment_frequency = proposals[index].payment_frequency;
          contract.scope_of_work = proposals[index].scope_of_work;
          contract.start_date = proposals[index].start_date;
          contract.end_date = proposals[index].end_date;
        }
      }
    });
    console.log('LOG : matchProposalsWithContracts -> contracts', contracts);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlePay = async (row) => {
    const data = await GetUserById(row.contractor_id);
    await PayContract(props.user.address, props.user.web3, row, data.user.wallet_address);
  };

  const contractDetailToggler = (event, row) => {
    setRowSelected(row);
    setToggleModal(!toggleModal);
    document.body.style.overflow = 'hidden';
  };

  const labelColor = (status) => {
    if (RED_STATUS.includes(status) && 'error') {
      return 'error';
    } else if (GREEN_STATUS.includes(status)) {
      return 'success';
    } else if (BLUE_STATUS.includes(status)) {
      return 'warning';
    }
    return 'info';
  };

  const TABLE_HEAD = [
    { id: 'contract_type', label: 'Contract Type', alignRight: false },
    { id: 'start_date', label: 'Start Date', alignRight: false },
    { id: 'end_date', label: 'End Date', alignRight: false },
    { id: 'payment_rate', label: 'Payment Rate', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    { id: 'pay', label: 'Pay', alignRight: false },
  ];
  //Eliminar columna de Pay para contractors
  if (props.user.role == Roles.CONTRACTOR) {
    TABLE_HEAD.pop();
  }
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - contracts.length) : 0;

  const filteredInvoices = applySortFilter(contracts, getComparator(order, orderBy), filterName);

  const filteredContracts = filteredInvoices.filter(function (contract) {
    if (props.user.role == Roles.CONTRACTOR) {
      return contract.contractor_id == props.user.id;
    } else if (props.user.role == Roles.EMPLOYER) {
      return contract.employer_id == props.user.id;
    }
  });
  if (proposals.length > 0) {
    const filteredContractsWithProposals = matchProposalsWithContracts(filteredContracts, proposals);
    console.log('LOG : Contracts -> filteredContractsWithProposals', filteredContractsWithProposals);
  }

  const isUserNotFound = filteredInvoices.length === 0;

  return (
    <Page title="User">
      <Container>
        {toggleModal && <ContractDetailModal row={rowSelected} addProductToggler={contractDetailToggler} />}
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Contracts
          </Typography>
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={INVOICELIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />

                <TableBody>
                  {filteredContracts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { contract_id, contract_type, currency, payment_rate, start_date, end_date, status } = row;
                    const isItemSelected = selected.indexOf(contract_type) !== -1;

                    return (
                      <TableRow
                        hover
                        key={contract_id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                        onClick={(event) => contractDetailToggler(event, row)}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, contract_type)} />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {contract_type}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{start_date}</TableCell>
                        <TableCell align="left">{end_date}</TableCell>
                        <TableCell align="left">{payment_rate}</TableCell>
                        <TableCell align="left">
                          <Label variant="ghost" color={labelColor(status)}>
                            {sentenceCase(status)}
                          </Label>
                        </TableCell>
                        {props.user.role == Roles.EMPLOYER ? (
                          <TableCell align="left">
                            <Button
                              size="large"
                              onClick={async () => handlePay(row)}
                              variant="contained"
                              disabled={status !== 'ACTIVE'}
                            >
                              Pay
                            </Button>
                          </TableCell>
                        ) : null}
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredContracts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(Contracts);
