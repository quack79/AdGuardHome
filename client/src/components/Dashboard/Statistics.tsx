import React from 'react';

import { Link } from 'react-router-dom';
import { withTranslation, Trans } from 'react-i18next';

import { StatsCard, STATS_CARD_VARIANTS } from './StatsCard';

import { getPercent } from '../../helpers/helpers';
import { RESPONSE_FILTER } from '../../helpers/constants';

interface StatisticsProps {
    dnsQueries: number[];
    blockedFiltering: number[];
    replacedSafebrowsing: number[];
    replacedParental: number[];
    numDnsQueries: number;
    numBlockedFiltering: number;
    numReplacedSafebrowsing: number;
    numReplacedParental: number;
    showThreatStats: boolean;
    showAdultStats: boolean;
}

const Statistics = ({
    dnsQueries,
    blockedFiltering,
    replacedSafebrowsing,
    replacedParental,
    numDnsQueries,
    numBlockedFiltering,
    numReplacedSafebrowsing,
    numReplacedParental,
    showThreatStats,
    showAdultStats,
}: StatisticsProps) => {
    const visibleCardsCount = 2 + Number(showThreatStats) + Number(showAdultStats);
    const cardColumnClass = `col-sm-6 col-lg-${12 / visibleCardsCount}`;

    return (
        <div className="row">
            <div className={cardColumnClass}>
                <StatsCard
                    total={numDnsQueries}
                    lineData={dnsQueries}
                    title={
                        <Link to="logs">
                            <Trans>dns_query</Trans>
                        </Link>
                    }
                    variant={STATS_CARD_VARIANTS.QUERIES}
                />
            </div>

            <div className={cardColumnClass}>
                <StatsCard
                    total={numBlockedFiltering}
                    lineData={blockedFiltering}
                    percent={getPercent(numDnsQueries, numBlockedFiltering)}
                    title={
                        <Trans
                            components={[
                                <Link to={`logs?response_status=${RESPONSE_FILTER.BLOCKED.QUERY}`} key="0">
                                    link
                                </Link>,
                            ]}>
                            blocked_by
                        </Trans>
                    }
                    variant={STATS_CARD_VARIANTS.ADS}
                />
            </div>

            {showThreatStats && (
                <div className={cardColumnClass}>
                    <StatsCard
                        total={numReplacedSafebrowsing}
                        lineData={replacedSafebrowsing}
                        percent={getPercent(numDnsQueries, numReplacedSafebrowsing)}
                        title={
                            <Link to={`logs?response_status=${RESPONSE_FILTER.BLOCKED_THREATS.QUERY}`}>
                                <Trans>stats_malware_phishing</Trans>
                            </Link>
                        }
                        variant={STATS_CARD_VARIANTS.THREATS}
                    />
                </div>
            )}

            {showAdultStats && (
                <div className={cardColumnClass}>
                    <StatsCard
                        total={numReplacedParental}
                        lineData={replacedParental}
                        percent={getPercent(numDnsQueries, numReplacedParental)}
                        title={
                            <Link to={`logs?response_status=${RESPONSE_FILTER.BLOCKED_ADULT_WEBSITES.QUERY}`}>
                                <Trans>stats_adult</Trans>
                            </Link>
                        }
                        variant={STATS_CARD_VARIANTS.ADULT}
                    />
                </div>
            )}
        </div>
    );
};

export default withTranslation()(Statistics);
