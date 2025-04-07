import { useQuery } from "@tanstack/react-query";
import { organizationService } from "../services/organizationService";
import { Organization, Deal } from "../types/global.types";
import type { OrganizationDetails } from "../types/global.types";
import styled from "styled-components";
import { useState, useMemo, useEffect } from "react";

export default function Organizations() {
  const [selectedOrganization, setSelectedOrganization] =
    useState<Organization | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [yearFilter, setYearFilter] = useState<string>("all");

  const organizationsQuery = useQuery({
    queryKey: ["organizations"],
    queryFn: organizationService.getAll,
  });

  const organizationDetailsQuery = useQuery<OrganizationDetails>({
    queryKey: ["organization", selectedOrganization?.id],
    queryFn: () => organizationService.getDetails(selectedOrganization!.id),
    enabled: !!selectedOrganization,
  });

  // Auto-select the first organization on load and if no other organization is selected
  useEffect(() => {
    if (organizationsQuery.data && !selectedOrganization) {
      setSelectedOrganization(organizationsQuery.data[0]);
    }
  }, [organizationsQuery, selectedOrganization]);

  // This frontend filtering could be much better, but is simple and works well for this challenge.
  // For a large application with much more data, I would implement filtering on the backend.
  // Get all of the unique years from all of the deals
  const availableYears = useMemo(() => {
    if (!organizationDetailsQuery.data) return [];
    const years = new Set<number>();
    organizationDetailsQuery.data.accounts.forEach((account) => {
      account.deals.forEach((deal) => {
        years.add(new Date(deal.start_date).getFullYear());
      });
    });
    return Array.from(years).sort((a, b) => b - a);
  }, [organizationDetailsQuery.data]);

  // Filter the deals based on the selected filters
  const filteredAccounts = useMemo(() => {
    if (!organizationDetailsQuery.data) return [];

    return organizationDetailsQuery.data.accounts.map((account) => ({
      ...account,
      deals: account.deals.filter((deal) => {
        const matchesStatus =
          statusFilter === "all" || deal.status === statusFilter;
        const dealYear = new Date(deal.start_date).getFullYear();
        const matchesYear =
          yearFilter === "all" || dealYear.toString() === yearFilter;
        return matchesStatus && matchesYear;
      }),
    }));
  }, [organizationDetailsQuery.data, statusFilter, yearFilter]);

  // Calculate total value for all filtered deals
  const totalValue = useMemo(() => {
    return filteredAccounts.reduce((sum, account) => {
      return (
        sum +
        account.deals.reduce((accountSum, deal) => accountSum + deal.value, 0)
      );
    }, 0);
  }, [filteredAccounts]);

  return (
    <OrganizationsList>
      <h1>{selectedOrganization?.name || "Organizations"}</h1>
      <UL>
        {organizationsQuery.data?.map((org: Organization) => (
          <LI
            key={org.id}
            onClick={() => setSelectedOrganization(org)}
            className={selectedOrganization?.id === org.id ? "selected" : ""}
          >
            {org.name}
          </LI>
        ))}
      </UL>
      <OrganizationDetails>
        {selectedOrganization && organizationDetailsQuery.data && (
          <>
            <h2>Accounts</h2>
            <FiltersContainer>
              <FilterGroup>
                <label htmlFor="status-filter">Status:</label>
                <Select
                  id="status-filter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </Select>
              </FilterGroup>
              <FilterGroup>
                <label htmlFor="year-filter">Year:</label>
                <Select
                  id="year-filter"
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                >
                  <option value="all">All Years</option>
                  {availableYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </Select>
              </FilterGroup>
            </FiltersContainer>
            <TotalValue>
              Total Value: <Value>${(totalValue / 100).toLocaleString()}</Value>
            </TotalValue>
            <AccountsGrid>
              {filteredAccounts.map((accountWithDeals) => {
                const accountTotal = accountWithDeals.deals.reduce(
                  (sum, deal) => sum + deal.value,
                  0
                );
                return (
                  <AccountCard key={accountWithDeals.id}>
                    <AccountHeader>{accountWithDeals.name}</AccountHeader>
                    <AccountTotal>
                      Total:{" "}
                      <Value>${(accountTotal / 100).toLocaleString()}</Value>
                    </AccountTotal>
                    <DealsList>
                      {accountWithDeals.deals.length > 0 ? (
                        accountWithDeals.deals.map((deal: Deal) => (
                          <DealCard key={deal.id} $status={deal.status}>
                            <DealStatus $status={deal.status}>
                              {deal.status}
                            </DealStatus>
                            <DealValue>
                              ${(deal.value / 100).toLocaleString()}
                            </DealValue>
                            <DealDates>
                              {new Date(deal.start_date).toLocaleDateString()} -{" "}
                              {new Date(deal.end_date).toLocaleDateString()}
                            </DealDates>
                          </DealCard>
                        ))
                      ) : (
                        <NoDealsMessage>
                          No deals match the current filters
                        </NoDealsMessage>
                      )}
                    </DealsList>
                  </AccountCard>
                );
              })}
            </AccountsGrid>
          </>
        )}
      </OrganizationDetails>
    </OrganizationsList>
  );
}

const OrganizationsList = styled.section`
  display: grid;
  place-items: center;
  width: 100%;
  padding: 2rem;
`;

const UL = styled.ul`
  list-style: none;
  padding: 0;
  width: fit-content;
`;

const LI = styled.li`
  padding: 0.5rem;
  border: 1px solid black;
  border-radius: 8px;
  margin: 0.5rem 0;
  transition: all 0.3s ease;

  &:hover {
    cursor: pointer;
    background-color: #f0f0f0;
    transform: scale(1.05);
  }

  &.selected {
    background-color: #e3f2fd;
    border-color: #2196f3;
  }
`;

const OrganizationDetails = styled.div`
  margin-top: 2rem;
  overflow-x: auto;
  width: 100%;
`;

const AccountsGrid = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  padding: 1rem;
`;

const AccountCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  width: 300px;
`;

const AccountHeader = styled.h3`
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
  color: #333;
`;

const DealsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const DealCard = styled.li<{ $status: string }>`
  background: ${(props) => {
    switch (props.$status) {
      case "active":
        return "#4caf5050";
      case "pending":
        return "#ff980050";
      case "completed":
        return "#9e9e9e50";
      default:
        return "#33333350";
    }
  }};
  border-radius: 4px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const DealStatus = styled.span<{ $status: string }>`
  font-size: 0.8rem;
  font-weight: 500;
  color: ${(props) => {
    switch (props.$status) {
      case "active":
        return "#4caf50";
      case "pending":
        return "#ff9800";
      case "completed":
        return "#9e9e9e";
      default:
        return "#333";
    }
  }};
`;

const DealValue = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: #2196f3;
`;

const DealDates = styled.span`
  font-size: 0.8rem;
  color: #666;
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: center;
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Select = styled.select`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: white;
  font-size: 0.9rem;
`;

const NoDealsMessage = styled.div`
  text-align: center;
  color: #666;
  font-style: italic;
  padding: 1rem;
`;

const TotalValue = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 1rem 0;
  padding: 0.5rem;
  background-color: #f8f9fa;
  border-radius: 4px;
  text-align: center;
  width: 100vw;
`;

const AccountTotal = styled.div`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: #666;
`;

const Value = styled.span`
  color: #2196f3;
  font-weight: 600;
`;
