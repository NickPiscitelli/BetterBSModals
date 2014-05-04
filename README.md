Extended Bootstrap 3 Modal Dialogs

I wrote this at my job since the default
was missing important functionality we
needed. I've been meaning to clean it up
and open source it. I have some time so
I figured I'd start.

As of now, it is just copy pasta from work.
Efficiency was a higher priorty that portability
so it may not work if cloned directly. It may
need minor modifications as of now.

_Original Commit Message__:

Boostrap Modal Extensions: BS seemed to lack a lot of
common functionality one would expect from a modal dialog.
I tried my best to quickly rectify this issue adding in
overrides for common tasks. If any featured was not
needed, just ask and I can extend further.

__NOTE__: All key names are lowercase so that they work as
data-attr's as well. The HTML5 spec does not allow for
UC chars in a data- declaration.

__beforesend__: Pass default jQuery.ajax() beforeSend function.
__errorfunc__: Pass default jQuery.ajax() error function.

__overridesuccess__: Override jQuery.ajax() success function.
__NOTE__: If you do this, you must manually inject your content.

__beforereplace__: The first function called in the default
jQuery.ajax() success function. Useful for pre DOM injection
processing.

__afterreplace__: The last func called in the default jQuery.ajax()
success function. The content is injected into the DOM at this
point.

__requesttype__: Default "GET". Override requestType.

__datatype__: Default "HTML". Override dataType.

__preserveprotocol__: In order to mitigate CORS issues, the protocol
is automatically stripped before the request. Set this to true
to prevent this functionality.

__nomodalcache__: By default, the modal dialog will not reload a
popup if it was the last popup called. Set this to true to
always reload your popup's content.

__ajaxcache__: Default "false". This controls the value of jQuery.ajax()
cache flag. This is to prevent the browers from caching the request.

__lasturi__: This is the value used to cache the modal key when modal
caching is active. This by default is the remote URL passed to the
modal trigger. Use this attribute to override the default caching
key for your URL. This is useful for requests sending via POST verbs.
__postdata__: Default "undef". Pass data to any rquest. This is not specific
to POST requests. 
__NOTE__: I'm not sure how it will be handled if you pass
data via a GET method via a QS and via this argument. Avoid that.

__ajaxheaders__: Send custom headers with request. Key/value pairs accepted.
See jQuery.ajax() headers documentation.

__noasync__: Default "false" (async is on). Set this var to true to disable
async requests for your modal.

I know some of the variables seem backwards, but that was to handle data-
binding easier. There is no good way to notate false via a data- attr without
further extending the functionality of bootstrap. That feature was shared with
all of bootstrap so I left it untouched.
