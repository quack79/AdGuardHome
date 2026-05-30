import { connect } from 'react-redux';

import { toggleProtection, getClients, initSettings } from '../actions';
import { getStats, getStatsConfig } from '../actions/stats';
import { getAccessList } from '../actions/access';

import Dashboard from '../components/Dashboard';
import { RootState } from '../initialState';

const mapStateToProps = (state: RootState) => {
    const { dashboard, stats, access, settings } = state;
    const props = { dashboard, stats, access, settings };
    return props;
};

type DispatchProps = {
    toggleProtection: (...args: unknown[]) => unknown;
    getClients: (...args: unknown[]) => unknown;
    getStats: (...args: unknown[]) => unknown;
    getStatsConfig: (...args: unknown[]) => unknown;
    getAccessList: () => (dispatch: any) => void;
    initSettings: (...args: unknown[]) => unknown;
};

const mapDispatchToProps: DispatchProps = {
    toggleProtection,
    getClients,
    getStats,
    getStatsConfig,
    getAccessList,
    initSettings,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
