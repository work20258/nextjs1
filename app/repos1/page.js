'use client';
import axios from 'axios';
import RepoTable from '../repos/RepoTable';

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
    key: 'id',
    header: 'Id',
  },
  {
    key: 'userName',
    header: 'UserName',
  },
  {
    key: 'email',
    header: 'Email',
  },
  {
    key: 'locked',
    header: 'Locked',
  },
  {
    key: 'sn',
    header: 'Sn',
  },
  {
    key: 'links',
    header: 'Links',
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
        <Link href={homepageUrl}>Homepage</Link>
      </li>
    )}
  </ul>
);

const getRowItems = (rows) =>
  rows.map((row) => ({
    ...row,
    key: row.id,
    userName: row.UserName,
    email: row.Email,
    locked: row.Locked,
    sn: row.Sn,
    links: <LinkList url={row.html_url} homepageUrl={row.homepage} />,
  }));

function RepoPage() {
  const [firstRowIndex, setFirstRowIndex] = useState(0);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [rows, setRows] = useState([]);

  useEffect(() => {

    async function fetchUsers() {
        try {
        //  const response = await axios.get('/db-data-go/getUsers');
          const response = await axios.get('/api/db-data-go/getUsers');
          console.log('API Response:', response.data); // 添加日志
          const res = Array.isArray(response.data) ? response.data : Object.values(response.data);
          setRows(getRowItems(res[1]));
      
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      }
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <Grid className="repo-page">
        <Column lg={16} md={8} sm={4} className="repo-page__r1">
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
    <Grid className="repo-page">
      <Column lg={16} md={8} sm={4} className="repo-page__r1">
        <RepoTable
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

export default RepoPage;