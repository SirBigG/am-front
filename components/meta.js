import Head from 'next/head'

const drawerWidth = 240;

export default () => (
  <div>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </Head>
    <style jsx global>{`
      body { 
        font: 11px menlo;
      }
      root: {
    display: 'flex',
  },
  appBar: {
    width: 'calc(100% - ${drawerWidth}px)',
    marginLeft: drawerWidth,
  },
  drawer: {
    width: ${drawerWidth},
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
    `}</style>
  </div>
)
