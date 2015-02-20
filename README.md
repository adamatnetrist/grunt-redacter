# grunt-redacter

Grunt plugin for selectively removing chunks of javascript or HTML source code.

## Installing

```shell
npm install grunt-redacter --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile like any other plugin:

```js
grunt.loadNpmTasks('grunt-redacter');
```

## Usage

The plugin will run through specified source files and remove any text between the specified comment strings.

### Example

```js
redacter: {
  options: {
    js: {
      start: '//+r',
      end: '//-r'
    },
    html: {
      start: '<!-- +r -->',
      end: '<!-- -r -->'
    }
  },
  your-task: { 
    files: {
      expand: true,
      cwd: '.tmp/scripts',
      src: ['*.js'],
      dest: 'dist/public/scripts'
    }
  },
  your-other-task: {
    files: {
      expand: true,
      cwd: 'dist/public',
      src: ['*.html', 'views/{,*/}*.html', '/templates/{,*}*.html'],
      dest: 'dist/public'
    }
  }
},
```