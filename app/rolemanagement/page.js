'use client';

import RolelistTable from './RolelistTable';
import {
  Link,
  DataTableSkeleton,
  Pagination,
  Column,
  Grid,
} from '@carbon/react';

import React, { useEffect, useState } from 'react';
//import { Octokit } from '@octokit/core';

//const octokitClient = new Octokit({});

const headers = [
  {
    key: 'role_type',
    header: 'RoleName',
  },
  {
    key: 'role_desc',
    header: 'RoleDescription',
  },
  {
    key: 'permissions_desc',
    header: 'RolePermissions',
  },
  {
    key: 'links',
    header: 'Operation',
  },
];

const rows_data = [
  {
    "id": 20221202081644801,
    "role_type": "admin",
    "role_desc": "The administrator for whole system",
    "permission_id": "2008",
    "permissions_url": "/account",
    "permissions_desc": "account:All",
  },
  {
    "id": 20221202081650116,
    "role_type": "normal",
    "role_desc": "The normal user only have login access",
    "permission_id": "3007",
    "permissions_url": "/pmp",
    "permissions_desc": "pmp:View & Insert & Delete",
  },
  {
    "id": 111111111111111,
    "role_type": "test",
    "role_desc": "just a test",
    "permission_id": "3007",
    "permissions_url": "/pmp",
    "permissions_desc": "pmp:View & Insert & Delete",
  },
];

const LinkList = ({ url, homepageUrl }) => (
  <ul style={{ display: 'flex' }}>
    <li>
      <Link href={url}>Edit</Link>
    </li>
    {homepageUrl && (
      <li>
        <span>&nbsp;|&nbsp;</span>
        <Link href={homepageUrl}>Delete</Link>
      </li>
    )}
  </ul>
);

const getRowItems = (rows) =>
  rows.map((row) => ({
    ...row,
    key: row.id,
    role_type: row.role_type,
    role_desc: row.role_desc,
    permissions_desc: row.permissions_desc,
    links: <LinkList url={row.html_url} homepageUrl={row.homepage} />,
  }));

function RoleManagementPage() {
  const [firstRowIndex, setFirstRowIndex] = useState(0);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function getCarbonRolelist() {
  /*    const res = await octokitClient.request('GET /orgs/{org}/repos', {
        org: 'carbon-design-system',
        per_page: 75,
        sort: 'updated',
        direction: 'desc',
      });  */

      const res=rows_data;

    /*  if (res.status === 200) {*/
    if (true) {
        setRows(getRowItems(res));
      } else {
        setError('Error obtaining repository data');
      }
      setLoading(false);
    }

    getCarbonRolelist();
  }, []);

  if (loading) {
    return (
      <Grid className="rolemanagement-page">
        <Column lg={16} md={8} sm={4} className="rolemanagement-page__r1">
          <DataTableSkeleton
            columnCount={headers.length + 1}
            rowCount={10}
            headers={headers}
          />
        </Column>
      </Grid>
    );
  }

  if (error) {
    return `Error! ${error}`;
  }

  return (
    <div align="right">
    <Grid className="rolemanagement-page">
      <Column lg={16} md={8} sm={4} className="rolemanagement-page__r1">
        <RolelistTable
          headers={headers}
          rows={rows.slice(firstRowIndex, firstRowIndex + currentPageSize)}
        />
        <Pagination
          totalItems={rows.length}
          backwardText="Previous page"
          forwardText="Next page"
          pageSize={currentPageSize}
          pageSizes={[5, 10, 15, 25]}
          itemsPerPageText="Items per page"
          onChange={({ page, pageSize }) => {
            if (pageSize !== currentPageSize) {
              setCurrentPageSize(pageSize);
            }
            setFirstRowIndex(pageSize * (page - 1));
          }}
        />
      </Column>
    </Grid>
   </div>
  );
}

export default RoleManagementPage;
