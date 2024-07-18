
'use client'
import {
  TextInput,
  SelectableTile,
  VStack,
  HStack,
  Grid,
  Column,
  IconButton,
  Tooltip,
  FormLabel,
  ComposedModal,
  TextArea
} from '@carbon/react'

import  "./_rolepermission.scss"
import { Add,Delete } from '@carbon/react/icons';

export default function RolePermissionPage() {
  const args = {
    disabled: false
  };  
  const items = [
    {
      "id":"1",
      "name":"account: view",
    },
    {
      "id":"2",
      "name":"account: view & update",
    },
    {
      "id":"3",
      "name":"account: view & insert",
    },
    {
      "id":"4",
      "name":"account: update & insert",
    }
  ]
  const itemSelected = []
  function add(){
    console.log(itemSelected)
  }
  return <div>
      <VStack gap={10}>
      <h1>Permission Description</h1>
      <div>
        <h2>Role Name</h2>
        <br />
        <VStack gap={6}>
          <HStack>
            <TextInput placeholder="Placeholder" />
            <div style = { {
            display: 'flex',
            alignItems: 'flex-end'
          }}>
            </div>
            </HStack>
            <HStack>
            <Grid style={{
              "padding-left":'0px',
              "height":"20rem",
            }}>
              <Column lg={7} className='scroll--box'>
              <FormLabel >
                All Permissions
              </FormLabel>
              {
                items.map((item)=>
                   <SelectableTile id={item.id} value={item.id} name="itemSelected" {...args} >
                      {item.name}
                    </SelectableTile>
                )
              }

              </Column>
              <Column lg={2} style={{
                'display': 'flex',
                'justify-content': 'center',
                'align-items': 'center',
                "padding-left":'0px'
              }}>
                <div>
                <IconButton label="label" onClick={add}>
                  <Add />
                </IconButton><p/>
                <IconButton label="label">
                  <Delete />
                </IconButton>
                </div>
              </Column>
              <Column lg={7} className='scroll--box'>
              <FormLabel>
                Selected Permission to the role
              </FormLabel>
                <SelectableTile id="selectable-tile-1" name="tiles" {...args}>
                  Option 1
                </SelectableTile>
                <SelectableTile id="selectable-tile-2" name="tiles" {...args}>
                  Option 2
                </SelectableTile>
                <SelectableTile id="selectable-tile-3" name="tiles" {...args}>
                  Option 3
                </SelectableTile>
              </Column>
            </Grid>
          </HStack>
        </VStack>
      </div>
</VStack>
      
  </div>
}