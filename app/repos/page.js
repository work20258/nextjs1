'use client';

import RepoTable from './RepoTable';
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
    key: 'name',
    header: 'Name',
  },
  {
    key: 'createdAt',
    header: 'Created',
  },
  {
    key: 'updatedAt',
    header: 'Updated',
  },
  {
    key: 'issueCount',
    header: 'Open Issues',
  },
  {
    key: 'stars',
    header: 'Stars',
  },
  {
    key: 'links',
    header: 'Links',
  },
];

const rows_data = [
  {
    "id": 84835531,
    "name": "carbon1",
    "html_url": "https://github.com/carbon-design-system/carbon",
    "description": "A design system built by IBM",
    "created_at": "2017-03-13T14:23:59Z",
    "updated_at": "2024-06-13T11:47:42Z",
    "homepage": "https://www.carbondesignsystem.com",
    "stargazers_count": 7531,
    "issues_count": 668,
  },
  {
    "id": 84835532,
    "name": "carbon2",
    "html_url": "https://github.com/carbon-design-system/carbon",
    "description": "A design system built by IBM",
    "created_at": "2017-03-13T14:23:59Z",
    "updated_at": "2024-06-13T11:47:42Z",
    "homepage": "https://www.carbondesignsystem.com",
    "stargazers_count": 7531,
    "issues_count": 668,
  },
  {
    "id": 84835533,
    "name": "carbon3",
    "html_url": "https://github.com/carbon-design-system/carbon",
    "description": "A design system built by IBM",
    "created_at": "2017-03-13T14:23:59Z",
    "updated_at": "2024-06-13T11:47:42Z",
    "homepage": "https://www.carbondesignsystem.com",
    "stargazers_count": 7531,
    "issues_count": 668,
  },
  {
    "id": 84835534,
    "name": "carbon5",
    "html_url": "https://github.com/carbon-design-system/carbon",
    "description": "A design system built by IBM",
    "created_at": "2017-03-13T14:23:59Z",
    "updated_at": "2024-06-13T11:47:42Z",
    "homepage": "https://www.carbondesignsystem.com",
    "stargazers_count": 7531,
    "issues_count": 668,
  },
  {
    "id": 84835535,
    "name": "carbon5",
    "html_url": "https://github.com/carbon-design-system/carbon",
    "description": "A design system built by IBM",
    "created_at": "2017-03-13T14:23:59Z",
    "updated_at": "2024-06-13T11:47:42Z",
    "homepage": "https://www.carbondesignsystem.com",
    "stargazers_count": 7531,
    "issues_count": 668,
  },
  {
    "id": 84835536,
    "name": "carbon6",
    "html_url": "https://github.com/carbon-design-system/carbon",
    "description": "A design system built by IBM",
    "created_at": "2017-03-13T14:23:59Z",
    "updated_at": "2024-06-13T11:47:42Z",
    "homepage": "https://www.carbondesignsystem.com",
    "stargazers_count": 7531,
    "issues_count": 668,
  },
];

const LinkList = ({ url, homepageUrl }) => (
  <ul style={{ display: 'flex' }}>
    <li>
      <Link href={url}>GitHub</Link>
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
    stars: row.stargazers_count,
    issueCount: row.issues_count,
    createdAt: new Date(row.created_at).toLocaleDateString(),
    updatedAt: new Date(row.updated_at).toLocaleDateString(),
    links: <LinkList url={row.html_url} homepageUrl={row.homepage} />,
  }));

function RepoPage() {
  const [firstRowIndex, setFirstRowIndex] = useState(0);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function getCarbonRepos() {
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

    getCarbonRepos();
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
